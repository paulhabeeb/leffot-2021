import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { mailingListBase } from '@lib/form-schema'

import { handleSubmit, initialValuesBase } from '@lib/forms/mailing-list'
import FooterNewsletterFormFields from './FooterNewsletterFormFields'

export default function FooterNewsletterForm({
    buttonLabel,
    context,
    inputPlaceholder,
}) {
    return (
        <Formik
            initialValues={initialValuesBase}
            validationSchema={Yup.object(mailingListBase)}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <FooterNewsletterFormFields
                        buttonLabel={buttonLabel}
                        context={context}
                        inputPlaceholder={inputPlaceholder}
                    />
                </Form>
            )}
        </Formik>
    )
}

FooterNewsletterForm.propTypes = {
    buttonLabel: PropTypes.string,
    context: PropTypes.string,
    inputPlaceholder: PropTypes.string,
}
