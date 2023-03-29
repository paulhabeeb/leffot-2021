import * as Sentry from '@sentry/nextjs'
/* eslint-disable */
/* globals ApplePaySession, Raven, console, Promise */

var cache = {}

/**
 * Apple Pay support for BigCommerce stores, utilizing the internal checkout
 * API
 *
 * Longer term, I want to re-factor this out into a set of ES6 modules:
 * - general initialization module for Apple Pay payments
 * - an Apple Pay session module
 * - generic helper module
 *
 * Ideally this lives outside the BC app and is pulled in via Bower. It is
 * already standalone in that it doesn't have any strong dependencies on the BC
 * app with the exception of the session payload and API calls.
 *
 * There are no external dependencies in this JavaScript. It uses ES6 features
 * and supports Safari 10+ only.
 *
 * Should you have any questions about this JavaScript, you should contact:
 * - Chris Boulton
 * - Phil Muir
 *
 * @type {Object}
 */
export const ApplePay = {
    /**
     * @type {Number}
     */
    VERSION: 1,

    /**
     * @type {string}
     */
    TOTAL_PENDING: 'pending',

    /**
     * @type {string}
     */
    TOTAL_FINAL: 'final',

    /**
     * @type {string}
     */
    CHECKOUT_BUTTON_CLASS: 'apple-pay-checkout-button',

    /**
     * @type {string}
     */
    PRODUCT_BUY_BUTTON_TARGET: 'apple-pay-buy-button',

    /**
     * @type {string}
     */
    LEGACY_CHECKOUT_ENDPOINT: '/internalapi/v1/checkout',
    CHECKOUT_ENDPOINT: '/api/storefront',

    /**
     * @type {Object}
     */
    raven: null,

    /**
     * @type {Object}
     */
    settings: null,

    /**
     * It begins!
     *
     * @param {Object} settings
     * @return {undefined}
     */
    init: function (settings) {
        if (!window.ApplePaySession || location.protocol != 'https:') {
            return
        }

        ApplePay.settings = settings

        ApplePay.setupLogging()
        ApplePay.setupCheckoutButtons()
        ApplePay.setupPDPButtons()
    },

    /**
     * Enable Apple Pay checkout/buy buttons on supported pages
     *
     * Here we do our best effort to enable the Apple Pay checkout buttons on
     * a page.
     *
     * First, we test for the required style elements. If there aren't any
     * (like for example the merchant has removed our master stylesheet), we don't
     * show the button.
     *
     * We check ApplePaySession.canMakePayments, which asks Apple Pay if the user
     * has a device with a secure element. Apple suggests we use canMakePayments
     * here, as it will return true even when the shopper has an empty wallet. In
     * this case when the click the button, Apple Pay will ask them to provision
     * a card.
     *
     * Finally, we render our listener for anything with .CHECKOUT_BUTTON_CLASS.
     * When the button is clicked, we extract the Apple Pay payload information
     * (currently in a script tag, will eventually be split between the script tag
     * and the button itself to assist with PDP purchases). We begin an Apple Pay
     * Session
     *
     * @return {undefined}
     */
    setupCheckoutButtons: function () {
        if (!ApplePaySession.canMakePayments()) {
            return
        }

        document.body.classList.add('apple-pay-supported')
        document.body.addEventListener('click', function (e) {
            if (
                !e.target.classList.contains(
                    ApplePay.settings.checkoutButtonClass
                )
            ) {
                return
            }

            e.preventDefault()
            e.stopPropagation()

            try {
                ApplePay.begin({ requiresShipping: true })
            } catch (error) {
                Sentry.captureException(error)
                return
            }
        })
    },

    /**
     * Setup Apple Pay buttons on PDP pages.
     *
     * When we support PDP, this method will handle the setup of PDP sessions,
     * target any PDP button elements, and handle the initialization of an Apple
     * Pay session. Right now we don't implement PDP support as our checkout API
     * does not yet support the idea of single item purchases like a "Buy Now" button
     * on a product page.
     *
     * @return {Boolean}
     */
    setupPDPButtons: function () {
        return true
    },

    /**
     * For a given BigCommerce Apple Pay payload, begin an Apple Pay session
     *
     * From the payload, we extract two sets configuration. The first is everything
     * Apple needs for a payment session (a PaymentRequest) and the second are a
     * bunch of BigCommerce specific settings such as store name, gateway, etc which
     * we use at multiple times during the purchase.
     *
     * For lack of a better option right now, the BigCommerce settings payload is
     * shoved onto the Apple Pay session as paymentSettings. This will be moved in the
     * future.
     *
     * When we're ready to begin, we setup all of the event callbacks and call
     * session.begin to display the payment sheet
     *
     * @param {Object} payload
     * @return {undefined}
     */
    begin: function (payload) {
        var paymentRequest = ApplePay.getPaymentRequest(payload)
        ApplePay.setLogContext(paymentRequest)

        var session = new ApplePaySession(ApplePay.VERSION, paymentRequest)
        session.paymentSettings = payload
        session.onpaymentmethodselected = ApplePay.savePaymentMethod
        session.onshippingcontactselected = ApplePay.saveShippingAddress
        session.onshippingmethodselected = ApplePay.saveShippingMethod
        session.onpaymentauthorized = ApplePay.chargeAndOrder
        session.onvalidatemerchant = ApplePay.validateMerchant
        session.begin()
    },

    /**
     * Handle the Apple Pay onpaymentmethodselected event
     *
     * This event is fired when a shopper changes their payment method in the
     * Apple Pay payment sheet. We utilize this event to return an updated total
     * and total line items (tax, discounts, etc) for an Apple Pay payment. It's
     * primarily used because we don't pass a "final" grand total into Apple Pay
     * at page load because we'd rather calculate it when the Apple Pay session begins.
     *
     * Relevant Apple Documentation:
     *  https://developer.apple.com/reference/applepayjs/applepaypaymentmethodselectedevent
     *
     * @param {ApplePayPaymentMethodSelectedEvent} e
     * @return {undefined}
     */
    savePaymentMethod: function (e) {
        var session = e.target
        ApplePay.request('GET', ApplePay.CHECKOUT_ENDPOINT + '/carts')
            .then(function (cart) {
                // get cart with item details
                return ApplePay.request(
                    'GET',
                    ApplePay.CHECKOUT_ENDPOINT + '/checkouts/' + cart[0].id
                )
            })
            .then(
                function (checkout) {
                    session.completePaymentMethodSelection(
                        ApplePay.totalForCart(checkout),
                        ApplePay.itemsForCart(checkout)
                    )
                },
                function (err) {
                    ApplePay.log(
                        'error',
                        'payment method save and cart fetch failed',
                        {
                            response: err,
                        }
                    )
                    // there is no status option on completePaymentMethodSelection, so fail
                    session.abort()
                }
            )
    },

    /**
     * Handle the Apple Pay onshippingcontactselected event
     *
     * This event is fired when a shopper changes their shipping address in the
     * Apple Pay payment sheet. When a shipping address is supplied, we submit it
     * back to BigCommerce to persist it, and also generate the list of shipping
     * methods. The list of shipping methods is then returned the Apple Pay
     * payment sheet. We also receive updated line items and a grand total.
     *
     * At this point of the transaction, Apple Pay only returns basic location data
     * for the shopper: city, zip, state, and country. We need to be able to save that
     * and then on Touch ID authentication when the transaction is authenticated, we
     * will fill in the remaining address data.
     *
     * If we receive no shipping options and the cart is digital products only, we
     * pass an empty list of shipping options to Apple Pay and it'll hide the
     * shipping option.
     *
     * If we receive a single shipping option, we pass an empty list of shipping
     * options and Apple Pay will hide the shipping option. We do this because
     * there is no other choice for the user to make.
     *
     * If we receive an error, or no shipping options for a physical cart then
     * we tell Apple Pay to highlight the shipping fields in the payment sheet.
     *
     * Note: Apple Pay assumes that the first returned shipping method is already
     * pre-selected and included in the total of the order. BigCommerce takes care
     * of this for us.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/applepayshippingcontactselectedevent
     *
     * @param {ApplePayShippingContactSelectedEvent} e
     * @return void
     */
    saveShippingAddress: function (e) {
        var session = e.target
        var shippingRequired = false
        var status = ApplePaySession.STATUS_SUCCESS

        Promise.all([
            ApplePay.request('GET', ApplePay.CHECKOUT_ENDPOINT + '/carts'),
            ApplePay.transformContactToAddress(e.shippingContact),
        ])
            .then(function (responses) {
                var cart = responses[0]
                var shippingAddress = responses[1]
                var lineItems = ApplePay.collectLineItems(cart[0].lineItems)
                var payload = [
                    {
                        shippingAddress: shippingAddress,
                        lineItems: lineItems,
                    },
                ]

                // redacted shipping contact information is returned by Apple at this point
                // @see https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778009-onshippingcontactselected
                return ApplePay.request(
                    'POST',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        cart[0].id +
                        '/consignments?include=consignments.availableShippingOptions',
                    payload
                )
            })
            .then(function (checkout) {
                var availableShippingOptions =
                    checkout.consignments[0].availableShippingOptions
                shippingRequired =
                    checkout.cart.lineItems.physicalItems.length > 0
                if (shippingRequired && availableShippingOptions.length === 0) {
                    ApplePay.log('info', 'No shipping options returned.', {
                        contact: e.shippingContact,
                        response: checkout,
                    })
                    status =
                        ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS
                    throw new Error(status)
                }

                var recommendedOptions = availableShippingOptions.filter(
                    function (item) {
                        if (item.isRecommended) {
                            return item
                        }
                    }
                )

                if (
                    recommendedOptions === undefined ||
                    (Array.isArray(recommendedOptions) &&
                        recommendedOptions.length === 0)
                ) {
                    recommendedOptions = availableShippingOptions
                }

                // pre-emptively save recommended shipping in case onshippingmethodselected event does not call
                return ApplePay.request(
                    'PUT',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        checkout.id +
                        '/consignments/' +
                        checkout.consignments[0].id,
                    { shippingOptionId: recommendedOptions[0].id }
                )
            })
            .then(function (checkout) {
                // refresh cart with new details
                return ApplePay.request(
                    'GET',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        checkout.id +
                        '?include=consignments.availableShippingOptions'
                )
            })
            .then(
                function (updatedConsignment) {
                    var shippingOptions = []
                    var availableShippingOptions =
                        updatedConsignment.consignments[0]
                            .availableShippingOptions

                    availableShippingOptions
                        .filter(function (option) {
                            if (!option.isRecommended) {
                                return option
                            }

                            shippingOptions.push({
                                label: option.description,
                                detail: option.transitTime,
                                amount: option.cost || 0,
                                identifier:
                                    updatedConsignment.id +
                                    '|' +
                                    updatedConsignment.consignments[0].id +
                                    '|' +
                                    option.id,
                            })
                        })
                        .forEach(function (option) {
                            shippingOptions.push({
                                label: option.description,
                                detail: option.transitTime,
                                amount: option.cost || 0,
                                identifier:
                                    updatedConsignment.id +
                                    '|' +
                                    updatedConsignment.consignments[0].id +
                                    '|' +
                                    option.id,
                            })
                        })

                    session.completeShippingContactSelection({
                        status: status,
                        newShippingMethods: shippingOptions,
                        newTotal: ApplePay.totalForCart(updatedConsignment),
                        newLineItems: ApplePay.itemsForCart(updatedConsignment),
                    })
                },
                function (err) {
                    var error = ApplePaySession.STATUS_FAILURE
                    if (err.status === 422) {
                        ApplePay.log('debug', 'invalid shipping address', {
                            contact: e.shippingContact,
                            response: err,
                        })
                        error =
                            ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS
                    } else {
                        ApplePay.log('error', 'save shipping address failed', {
                            contact: e.shippingContact,
                            response: err,
                        })
                    }
                    session.completeShippingContactSelection(
                        error,
                        [],
                        ApplePay.pendingTotal(),
                        []
                    )
                }
            )
            .catch(function (error) {
                Sentry.captureException(error)
                session.completeShippingContactSelection(
                    error,
                    [],
                    ApplePay.pendingTotal(),
                    []
                )
            })
    },

    /**
     * Handle the Apple Pay onshippingmethodselected event
     *
     * This event is fired when a shopper chooses a shipping option from the list
     * of shipping options we presented earlier. Apple Pay supplies us with all of
     * the details of the shipping method, however we only need the identifier. The
     * identifier is comprised of the BigCommerce shipping destination ID, and the
     * shipping method ID. We split that apart and submit them back to BigCommerce.
     *
     * On a successful response, we notify Apple Pay and provide updated line items
     * and an updated grand total for the order.
     *
     * If we receive an error or an invalid response, we tell Apple Pay to highlight
     * the shipping address field in the checkout.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/applepayshippingmethodselectedevent
     *
     * @param {ApplePayShippingMethodSelectedEvent} e
     * @return {undefined}
     */
    saveShippingMethod: function (e) {
        var session = e.target
        var split = e.shippingMethod.identifier.split('|'),
            cartId = split[0],
            consignmentId = split[1],
            optionId = split[2]

        ApplePay.request(
            'PUT',
            ApplePay.CHECKOUT_ENDPOINT +
                '/checkouts/' +
                cartId +
                '/consignments/' +
                consignmentId,
            { shippingOptionId: optionId }
        )
            .then(function () {
                // refresh cart with new details
                return ApplePay.request(
                    'GET',
                    ApplePay.CHECKOUT_ENDPOINT + '/checkouts/' + cartId
                )
            })
            .then(
                function (checkout) {
                    var status = ApplePaySession.STATUS_SUCCESS
                    session.completeShippingMethodSelection(
                        status,
                        ApplePay.totalForCart(checkout),
                        ApplePay.itemsForCart(checkout)
                    )
                },
                function (err) {
                    ApplePay.log('error', 'shipping method save failed', {
                        method: e.shippingMethod,
                        response: err,
                    })
                    session.completeShippingMethodSelection(
                        ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
                        null,
                        null
                    )
                }
            )
    },

    /**
     * Handle the Apple Pay onpaymentauthorized event and attempt to create the order
     * and charge for it.
     *
     * This event is fired when a shopper has finished making their address and
     * shipping method choices, and has authenticated using Touch ID to finalize the
     * transaction.
     *
     * At this point, we receive everything we need to build up the order and attempt
     * a charge for it:
     *  - The remaining shipping address fields (name, address line 1, etc)
     *  - The billing address
     *  - The phone number and email address of the shopper
     *  - The Apple Pay payment token
     *
     * A successful response here means the order was created and payment was taken
     * successfully. At this point, the BigCommerce backend has passed the payment
     * token over to BigPay, which has decrypted it and sent it onto the payment
     * gateway for payment processing. On a successful response, we tell the Apple
     * Pay payment sheet that the transaction was successful (which will dismiss it)
     * and redirect to the thank you page.
     *
     * Failures are treated differently depending upon the error returned from
     * the BigCommerce API. If the error is billing address related, we tell the
     * payment sheet to highlight the billing detail fields. If the failure is
     * shipping related, we highlight the shipping fields. For anything else, we
     * indicate a generic error occurred and Apple will show "Payment Not Completed"
     *
     * Relevant Apple Pay documentation:
     * https://developer.apple.com/reference/applepayjs/applepaypaymentauthorizedevent
     *
     * @param {ApplePayPaymentAuthorizedEvent}
     * @return void
     */
    chargeAndOrder: function (e) {
        var session = e.target
        var selectedShipping = null

        ApplePay.request('GET', ApplePay.CHECKOUT_ENDPOINT + '/carts')
            .then(function (cart) {
                // get cart with item details
                return Promise.all([
                    ApplePay.request(
                        'GET',
                        ApplePay.CHECKOUT_ENDPOINT + '/checkouts/' + cart[0].id
                    ),
                    ApplePay.transformContactToAddress(
                        e.payment.billingContact
                    ),
                ])
            })
            .then(function (responses) {
                var checkout = responses[0]
                var billingAddress = responses[1]

                // Apple does not return contact information in billingContact; so pick from shippingContact
                billingAddress.phone = e.payment.shippingContact.phoneNumber
                billingAddress.email = e.payment.shippingContact.emailAddress

                return ApplePay.request(
                    'POST',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        checkout.id +
                        '/billing-address',
                    billingAddress
                )
            })
            .then(function (checkout) {
                // when purchasing only digital products there is no need for a consignment
                if (!session.paymentSettings.requiresShipping) {
                    return Promise.resolve(null)
                }
                if (checkout.consignments.length > 0) {
                    // already selected shipping, don't change it now
                    selectedShipping =
                        checkout.consignments[0].selectedShippingOption
                    return ApplePay.request(
                        'DELETE',
                        ApplePay.CHECKOUT_ENDPOINT +
                            '/checkouts/' +
                            checkout.id +
                            '/consignments/' +
                            checkout.consignments[0].id
                    )
                }
            })
            .then(function (checkout) {
                return Promise.all([
                    checkout,
                    ApplePay.transformContactToAddress(
                        e.payment.shippingContact
                    ),
                ])
            })
            .then(function (responses) {
                var checkout = responses[0]
                var shippingAddress = responses[1]

                // when purchasing only digital products there is no need for a consignment
                if (!session.paymentSettings.requiresShipping) {
                    return Promise.resolve(null)
                }

                var lineItems = ApplePay.collectLineItems(
                    checkout.cart.lineItems
                )
                // recreating the consignment because the address has now "changed"
                var payload = [
                    {
                        shippingAddress: shippingAddress,
                        lineItems: lineItems,
                    },
                ]

                // the full shipping contact information is now returned from Apple, so save it
                return ApplePay.request(
                    'POST',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        checkout.id +
                        '/consignments?include=consignments.availableShippingOptions',
                    payload
                )
            })
            .then(function (consignment) {
                if (!session.paymentSettings.requiresShipping) {
                    return Promise.resolve(null)
                }

                // updating the address causes the "shipping method cache" to clear, re-save shipping method here
                return ApplePay.request(
                    'PUT',
                    ApplePay.CHECKOUT_ENDPOINT +
                        '/checkouts/' +
                        consignment.id +
                        '/consignments/' +
                        consignment.consignments[0].id,
                    { shippingOptionId: selectedShipping.id }
                )
            })
            .then(function () {
                var payload = {
                    useStoreCredit: false,
                    payment: {
                        name: ApplePay.settings.gateway,
                        paymentData: {
                            applePayToken: e.payment.token,
                        },
                    },
                }

                ApplePay.request(
                    'POST',
                    ApplePay.LEGACY_CHECKOUT_ENDPOINT + '/order',
                    payload
                ).then(
                    function () {
                        session.completePayment(ApplePaySession.STATUS_SUCCESS)
                        window.location = ApplePay.settings.confirmationLink
                    },
                    function (err) {
                        var safePayment = e.payment
                        safePayment.token = 'redacted'
                        ApplePay.log(
                            'error',
                            'order creation and payment failed',
                            {
                                payment: safePayment,
                                response: err,
                            }
                        )
                        session.completePayment(
                            ApplePay.appleStatusForFailedResponse(err)
                        )
                    }
                )
            })
    },

    /**
     * @param lineItems
     * @returns {[]}
     */
    collectLineItems: function (lineItems) {
        var items = []
        lineItems.physicalItems.forEach(function (item) {
            items.push({ itemId: item.id, quantity: item.quantity })
        })
        lineItems.digitalItems.forEach(function (item) {
            items.push({ itemId: item.id, quantity: item.quantity })
        })

        return items
    },

    /**
     * @param contact
     * @returns {{}}
     */
    transformContactToAddress: function (contact) {
        return (
            cache.countries
                ? Promise.resolve(cache.countries)
                : ApplePay.request('GET', '/internalapi/v1/store/countries')
        ).then(function (response) {
            cache.countries = response

            var address = {
                firstName: contact.givenName,
                lastName: contact.familyName,
                city: contact.locality,
                postalCode: contact.postalCode,
                countryCode: contact.countryCode,
                phone: contact.phoneNumber,
                email: contact.emailAddress,
            }

            var country = response.data.find(function (country) {
                return (
                    country.code === (contact.countryCode || '').toUpperCase()
                )
            })

            var state =
                country &&
                country.subdivisions.find(function (state) {
                    return (
                        state.code ===
                        (contact.administrativeArea || '').toUpperCase()
                    )
                })

            // `administrativeArea` can be a state code or a state name
            if (state) {
                address.stateOrProvinceCode = state.code
            } else {
                address.stateOrProvince = contact.administrativeArea
            }

            if (contact.addressLines) {
                if (contact.addressLines[0]) {
                    address.address1 = contact.addressLines[0]
                }
                if (contact.addressLines[1]) {
                    address.address2 = contact.addressLines[1]
                }
            }

            return address
        })
    },

    /**
     * Translate an error response from the BigCommerce API into an Apple Pay
     * supported error code.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/applepaysession/1864804-apple_pay_status_codes
     *
     * @param {Object} err
     * @return {Number}
     */
    appleStatusForFailedResponse: function (err) {
        try {
            if (err.type == 'invalid_shipping_address') {
                return ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS
            } else if (err.type == 'invalid_billing_address') {
                return ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS
            }
            return ApplePaySession.STATUS_FAILURE
        } catch (error) {
            Sentry.captureException(error)
            return ApplePaySession.STATUS_FAILURE
        }
    },

    /**
     * Handle the Apple Pay onvalidatemerchant event
     *
     * The first step an Apple Pay transaction is merchant validation. This is
     * initiated as soon as Apple Pay shows the payment sheet and is used to
     * validate the merchant is setup correctly for Apple Pay and the merchant
     * identifier matches the domain the payment is occurring on.
     *
     * For merchant validation, we contact the public endpoint of BigPay. We pass
     * the Apple generated merchant validation URL, which BigPay then contacts to
     * retrieve an opaque payment session which we pass back to Apple Pay.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/applepayvalidatemerchantevent
     *
     * @param {ApplePayValidateMerchantEvent} e
     * @return {undefined}
     */
    validateMerchant: function (e) {
        var session = e.target
        var endpoint =
            ApplePay.settings.paymentsUrl +
            '/api/public/v1/payments/applepay/validate_merchant'
        var body = [
            'validationUrl=' + encodeURIComponent(e.validationURL),
            'merchantIdentifier=' +
                encodeURIComponent(ApplePay.settings.merchantId),
            'displayName=' + encodeURIComponent(ApplePay.settings.storeName),
            'domainName=' + encodeURIComponent(ApplePay.getMerchantDomain()),
        ].join('&')
        ApplePay.request('POST', endpoint, body).then(
            function (validationResult) {
                session.completeMerchantValidation(validationResult)
            },
            function (err) {
                ApplePay.log('error', 'merchant validation failed', {
                    response: err,
                })
            }
        )
    },

    /**
     * Return the domain of the merchant. In our case, this is the domain name
     * of the current page.
     *
     * @return {string}
     */
    getMerchantDomain: function () {
        return window.location.hostname
    },

    /**
     * Generate an Apple Pay PaymentRequest blob to be sent to ApplePaySession.new
     *
     * This payload contains all of the information that Apple Pay needs to initiate
     * a new payment session for the shopper.
     *
     * A combination of store settings (such as currency code, name, country) are
     * passed in as well as information that's unique to this shopper (such as if
     * a shipping address is required or not.
     *
     * The initial payment request includes a pending total item, instead of a final
     * total item. We call back to BigCommerce to generate "final" total rows.
     *
     * Apple Pay reference documentation:
     *  https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest
     *
     * @param {Object} payload
     * @return {Object}
     */
    getPaymentRequest: function (payload) {
        var session = {
            countryCode: ApplePay.settings.countryCode,
            currencyCode: ApplePay.settings.currencyCode,
            requiredBillingContactFields: ['postalAddress'],
            requiredShippingContactFields: ['email', 'phone'],
            supportedNetworks: ApplePay.settings.supportedNetworks,
            merchantCapabilities: ApplePay.settings.merchantCapabilities,
            total: ApplePay.pendingTotal(),
            lineItems: [],
        }

        if (payload.requiresShipping) {
            session.requiredShippingContactFields.push('postalAddress')
        }

        return session
    },

    /**
     * Using a BigCommerce cart, generate a grand total item for Apple Pay.
     *
     * A total line item can either be flagged as a final amount or a pending
     * amount, which basically just flags them differently in the Apple Pay payment
     * sheet. A pending item results in Apple Pay showing "Amount Pending".
     *
     * For a grand total, the label should always be the store name.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/lineitem
     *
     * @param {Object} cart
     * @return {LineItem}
     */
    totalForCart: function (cart) {
        return {
            type: ApplePay.TOTAL_FINAL,
            label: ApplePay.settings.storeName,
            amount: cart.grandTotal,
        }
    },

    /**
     * Generate a temporary "pending total" to be shown on the Apple Pay payment
     * sheet while we call back to BigCommerce to return the finalized amount.
     *
     * Total row will be flagged as pending which means Apple Pay will show "Amount
     * Pending" instead of a price, so we just pass $0.01 here knowing we'll have
     * a real total soon.
     *
     * For a grand total, the label should always be the store name.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/lineitem
     *
     * @return {LineItem}
     */
    pendingTotal: function () {
        return {
            type: ApplePay.TOTAL_PENDING,
            label: ApplePay.settings.storeName,
            amount: 0.01,
        }
    },

    /**
     * Using a BigCommerce cart, generate and return a summary of total line items
     * to show in the payment sheet.
     *
     * Apple would prefer we show the bare minimum number of line items in the payment
     * sheet, and by line items they mean total line items (subtotal, tax, etc). We
     * take the returned cart from BigCommerce and return a list of line items where
     * the total for them is not $0.00.
     *
     * Relevant Apple Pay documentation:
     *  https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/lineitem
     *
     * @param {Object} cart
     * @return {array}
     */
    itemsForCart: function (cart) {
        var couponAmount = cart.coupons.reduce(function (couponTotal, coupon) {
            return couponTotal + coupon.discountedAmount
        }, 0)
        var discountAmount = cart.cart.discountAmount
        var giftCertAmount = cart.giftCertificates.reduce(function (
            giftTotal,
            cert
        ) {
            return giftTotal + cert.amount
        },
        0)

        var items = [
            { label: 'Subtotal', amount: cart.subtotal || 0 },
            { label: 'Coupons', amount: couponAmount },
            { label: 'Discount', amount: discountAmount },
            { label: 'Gift Certificates', amount: giftCertAmount },
            { label: 'Shipping', amount: cart.shippingCostTotal || 0 },
            { label: 'Handling', amount: cart.handlingCostTotal || 0 },
            { label: 'Tax', amount: cart.taxTotal || 0 },
        ]

        return items.filter(function (i) {
            return i.amount !== 0 && i.amount != null
        })
    },

    /**
     * Setup Raven for error reporting and diagnostic information.
     *
     * This will trigger Raven to be loaded and configured with a Sentry instance
     * to report errors to. Additional tags (including the store name, merchant ID)
     * are configured to be sent along with every Sentry call to allow for easier
     * filtering in the Sentry UI
     *
     * Raven is only loaded if it wasn't already. The loaded Raven instance is bound
     * only to the Apple Pay integration.
     *
     * @return {undefined}
     */
    setupLogging: function () {
        if (!ApplePay.settings.sentry) {
            return
        }

        var callback = function () {
            ApplePay.raven = Raven.noConflict()
                .config(ApplePay.settings.sentry, {
                    whitelistUrls: [/applepay/],
                    dataCallback: function (d) {
                        if (d.token) {
                            d.token = '**redacted**'
                        }
                        return d
                    },
                })
                .setTagsContext(ApplePay.settings)
                .install()
        }
        if (window.Raven) {
            callback()
        } else {
            var script = document.createElement('script')
            script.src = '//cdn.ravenjs.com/1.1.19/jquery,native/raven.min.js'
            script.onload = callback
            document.head.appendChild(script)
        }
    },

    /**
     * Given an Apple Pay session, set additional log context information for Raven
     *
     * The additional information is useful for diagnostic purposes.
     *
     * @param {Object} session
     * @return {undefined}
     */
    setLogContext: function (session) {
        if (!ApplePay.raven) {
            return
        }

        ApplePay.raven.setExtraContext({
            requiredShippingContactFields:
                session.requiredShippingContactFields,
            requiredBillingContactFields: session.requiredBillingContactFields,
            supportedNetworks: session.supportedNetworks,
            merchantCapabilities: session.merchantCapabilities,
        })
    },

    /**
     * Log a message.
     *
     * If debug mode is not enabled and the level of the log message is debug, then
     * nothing will happen.
     *
     * If Raven (Sentry) is enabled the message will be submitted to Raven as well.
     *
     * All messages end up in the JavaScript console.
     *
     * @param {string} level
     * @param {string} message
     * @param {Object} data
     * @return {undefined}
     */
    log: function (level, message, data) {
        if (!ApplePay.debug && level == 'debug') {
            return
        }

        if (ApplePay.raven) {
            ApplePay.raven.captureMessage(message, {
                level: level,
                extra: data,
            })
        }
        console[level](message, data)
    },

    /**
     * Perform an AJAX request and return a Promise.
     *
     * There is an assumption here that the remote endpoint you are talking to
     * returns JSON. If the supplied request body is a string, it is sent as
     * application/x-www-form-urlencoded. If the request body is an object, it is
     * assumed it's JSON and is sent as application/json.
     *
     * @param {string} method
     * @param {string} url
     * @param {Object|String} body
     * @return {Promise}
     */
    request: function (method, url, body) {
        var contentType
        if (body && typeof body == 'object') {
            body = JSON.stringify(body)
            contentType = 'application/json'
        } else {
            contentType = 'application/x-www-form-urlencoded'
        }

        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest()
            /**
                 explicit setting of async flag to true is needed
                 to prevent apple pay from running into issues during merchant verification call
                 when client scripts override the native XMHttPRequest.open
                 PAYMENTS-6883
                 **/
            req.open(method, url, true)
            req.responseType = 'json'
            if (body) {
                req.setRequestHeader('Content-Type', contentType)
            }
            req.onload = function () {
                if (req.status >= 200 && req.status < 300) {
                    resolve(req.response)
                } else {
                    var err = req.response || {}
                    err.status = req.status
                    err.statusText = req.statusText
                    reject(err)
                }
            }

            req.onerror = function () {
                reject(new TypeError('request failed'))
            }

            req.send(body)
        })
    },
}
