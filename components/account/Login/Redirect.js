import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'
import qs from 'qs'

export default function LoginRedirect({ isInitialMount }) {
    const { search } = useLocation()
    const queries = qs.parse(search.replace('?', ''))

    if (queries.action === 'reset_password') {
        return <Redirect to='/reset-password' />
    }
    if (queries.action === 'change_password') {
        return (
            <Redirect
                to={{
                    pathname: '/change-password',
                    search,
                }}
            />
        )
    }
    if (queries.action === 'create_account') {
        return <Redirect to='/create-account' />
    }

    return (
        <Redirect
            to={{
                pathname: '/login',
                state: {
                    isInitialMount,
                },
            }}
        />
    )
}

LoginRedirect.propTypes = {
    isInitialMount: PropTypes.bool,
}
