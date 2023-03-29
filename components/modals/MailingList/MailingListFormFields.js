import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import { Button } from '@components/forms/actions'
import { ErrorMessage } from '@components/common'
import {
    BaseFields,
    NameFields,
    PreownedFields,
} from '@components/forms/common/MailingList'
import styles from './MailingListFormFields.module.scss'

export default function MailingListFormFields({ context, isPreowned }) {
    const { isSubmitting, status } = useFormikContext()

    if (status && status.success) return null

    return (
        <section>
            <NameFields />
            <BaseFields context={context} />
            {isPreowned && <PreownedFields />}
            <Button
                caption='Subscribe'
                className={styles.button}
                isSubmitting={isSubmitting}
                type='submit'
            />
            {status && status.error && <ErrorMessage message={status.error} />}
        </section>
    )
}

MailingListFormFields.propTypes = {
    context: PropTypes.string,
    isPreowned: PropTypes.bool,
}
