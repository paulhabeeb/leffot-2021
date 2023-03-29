import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import ModalHeader from '../ModalHeader'

export default function MailingListFormHeader({ body, title }) {
    const { status, values } = useFormikContext()
    let newBody = body
    let newTitle = title

    if (status && status.success) {
        newBody = (
            <>
                You’re now subscribed at <strong>{values.email_address}</strong>
                . You’ll receive emails about products, events, and other Leffot
                news.
            </>
        )
        newTitle = 'Success!'
    }

    return <ModalHeader title={newTitle} body={newBody} />
}

MailingListFormHeader.propTypes = {
    body: PropTypes.string,
    title: PropTypes.string,
}
