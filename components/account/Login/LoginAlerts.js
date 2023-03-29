import PropTypes from 'prop-types'

import { Alert } from '@components/common'

export default function LoginAlerts({
    accountCreated,
    forms,
    location,
    passwordReset,
}) {
    return (
        <>
            {forms.login && forms.login.error && (
                <Alert message={forms.login.error} style='error' />
            )}
            {!accountCreated && passwordReset && (
                <Alert message='If the entered email address is associated with this store, you will receive a password reset email. If you don’t receive this e-mail, please check your junk mail folder or contact us for further assistance.' />
            )}
            {accountCreated && (
                <Alert
                    message={`Thanks for registering, ${location.state.customer.first_name}. Please sign in below.`}
                />
            )}
        </>
    )
}

LoginAlerts.propTypes = {
    accountCreated: PropTypes.bool,
    forms: PropTypes.array,
    location: PropTypes.object,
    passwordReset: PropTypes.bool,
}
