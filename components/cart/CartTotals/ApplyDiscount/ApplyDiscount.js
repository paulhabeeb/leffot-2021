import { useState } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/nextjs'
import AnimateHeight from 'react-animate-height'
import { FormRow, TextInput } from '@leffot/form-controls'

import axios from 'axios'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { ErrorMessage } from '@components/common'
import { Button } from '@components/forms/actions'
import { useCartContext } from '../../CartContext'
import ShowHideButton from '../ShowHideButton'
import TotalValue from '../TotalValue'
import styles from './ApplyDiscount.module.scss'

export default function ApplyDiscount({ checkoutId, formName, id, label }) {
    const { revalidateCart } = useCartContext()
    const [isOpen, setIsOpen] = useState(false)

    const initialValues = { [id]: '' }
    const validationSchema = { [id]: Yup.string().required('Required') }

    const handleSubmit = async (values, { resetForm, setStatus }) => {
        try {
            await axios({
                method: 'POST',
                url: `/api/bc-rest/checkouts/${checkoutId}/coupons`,
                data: {
                    coupon_code: values[id],
                },
            })

            revalidateCart()
            setIsOpen(false)
            resetForm()
            setStatus(null)
        } catch (error) {
            setStatus({
                error:
                    error?.response?.data?.detail ||
                    'There was an error applying the code. Please try again later.',
            })
            Sentry.captureException(error)
        }
    }

    return (
        <>
            <TotalValue>
                {isOpen ? (
                    <ShowHideButton
                        label='Cancel'
                        onClick={() => setIsOpen(false)}
                        type='secondary'
                    />
                ) : (
                    <ShowHideButton
                        label='Add +'
                        onClick={() => setIsOpen(true)}
                        type='primary'
                    />
                )}
            </TotalValue>
            <AnimateHeight
                className={styles.container}
                duration={200}
                height={isOpen ? 'auto' : 0}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape(validationSchema)}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form name={formName}>
                            <div className={styles.flex}>
                                <FormRow>
                                    <TextInput
                                        hideLabel={true}
                                        id={id}
                                        label={label}
                                        name={id}
                                        placeholder={label}
                                        type='text'
                                    />
                                </FormRow>
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        caption='Apply'
                                        className={styles.button}
                                        isSubmitting={isSubmitting}
                                        loaderSize={16}
                                    />
                                </div>
                            </div>
                            {status && status.error && (
                                <ErrorMessage message={status.error} />
                            )}
                        </Form>
                    )}
                </Formik>
            </AnimateHeight>
        </>
    )
}

ApplyDiscount.propTypes = {
    checkoutId: PropTypes.string,
    formName: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
}
