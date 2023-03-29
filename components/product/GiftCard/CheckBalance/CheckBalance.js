import * as Sentry from '@sentry/nextjs'
import usePrice from '@framework/use-price'
import axios from 'axios'
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { FormRow, TextInput } from '@leffot/form-controls'
import { giftCertificateCheckBalance } from '@lib/form-schema'

import { ErrorBoundary, ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import styles from './CheckBalance.module.scss'

function BalanceResult() {
    const { resetForm, setStatus, status } = useFormikContext()
    const { price } = usePrice({
        amount: parseInt(status.balance),
        currencyCode: status.currency_code,
    })

    const showForm = event => {
        event.preventDefault()
        resetForm()
        setStatus(null)
    }

    return (
        <>
            <dl className={styles.result}>
                <div className={styles.codeWrapper}>
                    <dt className={styles.resultTitle}>Gift Card Code</dt>
                    <dd>{status.code}</dd>
                </div>
                <div>
                    <dt className={styles.resultTitle}>Balance</dt>
                    <dd>{price}</dd>
                </div>
            </dl>
            <button
                className={styles.checkAgainButton}
                onClick={showForm}
                type='button'
            >
                Check Another Gift Card
            </button>
        </>
    )
}

function BalanceForm() {
    const { isSubmitting, status } = useFormikContext()

    return (
        <>
            <p className={styles.caption}>
                You can check the balance of a gift card by typing the code in
                to the box below.
            </p>
            <Form>
                <FormRow>
                    <TextInput id='id' label='Gift Card Code' name='id' />
                </FormRow>
                <Button
                    caption='Check Balance'
                    className={styles.submitButton}
                    isSubmitting={isSubmitting}
                />
                {status && status.error && (
                    <ErrorMessage
                        className={styles.error}
                        message={status.error}
                    />
                )}
            </Form>
        </>
    )
}

export default function CheckBalance() {
    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            const { data } = await axios.get(
                `/api/bc-rest/gift-certificates?code=${values.id}`
            )

            setStatus(data[0])
            setSubmitting(false)
        } catch (error) {
            setStatus({
                error: 'There was a problem submitting the form. Please complete all required fields and try again later.',
            })
            setSubmitting(false)
            Sentry.captureException(error)
        }
    }

    return (
        <main id='main' className={styles.container}>
            <h1 className={styles.title}>Check Gift Card Balance</h1>
            <ErrorBoundary>
                <Formik
                    initialValues={{ id: '' }}
                    validationSchema={Yup.object(giftCertificateCheckBalance)}
                    onSubmit={handleSubmit}
                >
                    {({ status }) => {
                        if (status && status.code) {
                            return <BalanceResult />
                        }

                        return <BalanceForm />
                    }}
                </Formik>
            </ErrorBoundary>
        </main>
    )
}
