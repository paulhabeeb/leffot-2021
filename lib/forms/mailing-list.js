import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

export const initialValuesBase = {
    email_address: '',
    status_if_new: 'subscribed',
    interests: {
        '10947e23e6': true,
    },
}

export const initialValuesExtended = isPreowned => ({
    merge_fields: {
        FNAME: '',
        LNAME: '',
    },
    interests: {
        '78171ee518': false,
        '6c7fb58d5e': false,
        '42ba7b05b1': false,
        be83496090: false,
        '04974777a2': false,
        '8351feff88': false,
        f995d03157: false,
        '6c315de5fb': false,
        ce0f136706: false,
        c7c2a1d553: false,
        abfeee5b34: false,
        '77748a26d7': false,
        f89cf003ac: false,
        e10cb257e3: false,
        '5082da5b5f': false,
        '57d0fe2ac1': false,
        '03682edc6e': false,
        '10947e23e6': !isPreowned,
    },
})

export const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
        await axios.put('/api/mailchimp', values)

        setSubmitting(false)
        setStatus({
            success: true,
        })
    } catch (error) {
        setSubmitting(false)
        setStatus({
            error: 'Hmmm... That didn’t quite work. Please try again later.',
        })
        Sentry.captureException(error)
    }
}
