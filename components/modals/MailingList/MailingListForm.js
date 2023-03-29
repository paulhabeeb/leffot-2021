import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { mailingListBase, mailingListExtended } from '@lib/form-schema'

import {
    handleSubmit,
    initialValuesBase,
    initialValuesExtended,
} from '@lib/forms/mailing-list'
import MailingListFormFields from './MailingListFormFields'
import MailingListFormHeader from './MailingListFormHeader'

export default function MailingListForm({ body, context, title, isPreowned }) {
    const initialValues = {
        ...initialValuesBase,
        ...initialValuesExtended(isPreowned),
    }
    const validationSchema = {
        ...mailingListBase,
        ...mailingListExtended(isPreowned),
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <MailingListFormHeader title={title} body={body} />
                    <MailingListFormFields
                        isPreowned={isPreowned}
                        context={context}
                    />
                </Form>
            )}
        </Formik>
    )
}

MailingListForm.propTypes = {
    body: PropTypes.string,
    context: PropTypes.string,
    title: PropTypes.string,
    isPreowned: PropTypes.bool,
}

MailingListForm.defaultProps = {
    context: 'modal',
    title: 'Get notified',
    body: 'Get the latest products, events, news, and more delivered straight to your inbox.',
}
