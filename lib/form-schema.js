import * as Yup from 'yup'

const booleanRequired = Yup.boolean()
    .required('Required')
    .oneOf([true], 'Required')

export const address = {
    address1: Yup.string().required('Required'),
    address2: Yup.string(),
    city: Yup.string().max(100).required('Required'),
    company: Yup.string().max(255),
    country_code: Yup.string().required('Required'),
    first_name: Yup.string().max(255).required('Required'),
    last_name: Yup.string().max(255).required('Required'),
    phone: Yup.string().max(50).required('Required'),
    postal_code: Yup.string().max(30).required('Required'),
}

export const creditCardIsDefault = {
    default_instrument: Yup.boolean().required('Required'),
}

export const creditCard = {
    number: Yup.string().required('Required'),
    verification_value: Yup.string().required('Required'),
    expiration: Yup.string().required('Required'),
    cardholder_name: Yup.string().max(255).required('Required'),
}

export const email = {
    email: Yup.string()
        .email('Please enter a valid email address, such as user@example.com.')
        .required('Required'),
}

export const giftCertificateCheckBalance = {
    id: Yup.string().required('Required'),
}

export const giftCertificatePurchase = (min, max) => {
    return Yup.object({
        recipient: Yup.object({
            name: Yup.string().required('Required'),
            email: email.email,
        }),
        sender: Yup.object({
            name: Yup.string().required('Required'),
            email: email.email,
        }),
        agree: Yup.boolean().oneOf([true], 'You must agree to these terms'),
        message: Yup.string(),
        amount: Yup.number()
            .typeError('Gift card amount must be a number.')
            .min(
                min.value,
                `Select an amount greater than or equal to ${min.formatted}`
            )
            .max(
                max.value,
                `Select an amount less than or equal to ${max.formatted}.`
            )
            .required('Required'),
    })
}

export const login = {
    email: Yup.string()
        .email('Please enter a valid email address, such as user@example.com.')
        .required('Required'),
    password: Yup.string().required('Please enter your password.'),
}

export const password = Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d).{7,}$/,
        'Passwords must use at least one letter and one number'
    )
    .required('Please enter a password')

export const passwordConfirm = otherFieldName => {
    return Yup.string()
        .oneOf([Yup.ref(otherFieldName), null], 'Passwords do not match')
        .required('Please re-enter your password')
}

export const newAccount = {
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: email.email,
    password: password,
    passwordConfirm: passwordConfirm('password'),
    recaptcha: Yup.string()
        .required('You must complete the reCAPTCHA')
        .typeError('You must complete the reCAPTCHA'),
}

export const resetPassword = {
    password: password,
    passwordConfirm: passwordConfirm('password'),
}

export const stateRequired = {
    state_or_province: Yup.string().max(100).required('Required'),
}

export const stateOptional = {
    state_or_province: Yup.string().max(100),
}

const preownedSizeFields = [
    '78171ee518',
    '6c7fb58d5e',
    '42ba7b05b1',
    'be83496090',
    '04974777a2',
    '8351feff88',
    'f995d03157',
    '6c315de5fb',
    'ce0f136706',
    'c7c2a1d553',
    'abfeee5b34',
    '77748a26d7',
    'f89cf003ac',
    'e10cb257e3',
    '5082da5b5f',
    '57d0fe2ac1',
    '03682edc6e',
]

export const mailingListBase = {
    email_address: email.email,
    status_if_new: Yup.string().required('Required'),
}

export const mailingListExtended = (isPreowned = false) => ({
    merge_fields: Yup.object({
        FNAME: Yup.string(),
        LNAME: Yup.string(),
    }),
    interests: Yup.lazy(values => {
        // Interests is made up of all the pre-owned sizes, plus one
        // key that's for the general list group. These are the subscribers
        // who get every email we send. Pre-owned sizes get only emails about
        // POW shoes in those sizes, unless they're also subscribed to
        // the general list.

        const generalList = '10947e23e6'

        // If we're not showing a form that includes the pre-owned sizes, make
        // only the general list a required option.
        if (!isPreowned) {
            return Yup.object({
                [generalList]: booleanRequired,
            })
        }

        // If we're showing the pre-owned sizes, and at least one size is
        // selected, then don't required any other options. Make sure the
        // selected value isn't the general list, since the values var will
        // include that, too.
        if (
            Object.entries(values).some(
                ([key, value]) => value === true && key !== generalList
            )
        ) {
            return Yup.mixed().notRequired()
        }

        // If we're showing the pre-owned sizes and nothing is selected,
        // mark everything required. This might not be the best way to do this,
        // but what else is?
        const validators = { [generalList]: Yup.boolean() }
        preownedSizeFields.forEach(interest => {
            validators[interest] = booleanRequired
        })

        return Yup.object(validators)
    }),
})
