import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import { Button } from '@components/forms/actions'
import { ErrorMessage } from '@components/common'
import { BaseFields } from '@components/forms/common/MailingList'
import styles from './FooterNewsletterFormFields.module.scss'

export default function FooterNewsletterFormFields({
    buttonLabel,
    context,
    inputPlaceholder,
}) {
    const { isSubmitting, status } = useFormikContext()

    if (status && status.success) {
        return <p className={styles.success}>Success! You’re now subscribed.</p>
    }

    return (
        <>
            <div className={styles.container}>
                <BaseFields context={context} placeholder={inputPlaceholder} />
                <div>
                    <Button
                        caption={buttonLabel}
                        className={styles.button}
                        isSubmitting={isSubmitting}
                        loaderSize={16}
                        type='submit'
                    />
                </div>
            </div>
            {status && status.error && <ErrorMessage message={status.error} />}
        </>
    )
}

FooterNewsletterFormFields.propTypes = {
    buttonLabel: PropTypes.string,
    context: PropTypes.string,
    inputPlaceholder: PropTypes.string,
}
