import PropTypes from 'prop-types'

import ItemOptions from './ItemOptions'

export default function GiftCardItemOptions({ message, recipient, sender }) {
    const options = [
        {
            name: 'To',
            nameId: `gc-to-${Math.random()}`,
            value: `${recipient.name} (${recipient.email})`,
        },
        {
            name: 'From',
            nameId: `gc-from-${Math.random()}`,
            value: `${sender.name} (${sender.email})`,
        },
        {
            name: 'Message',
            nameId: `gc-message-${Math.random()}`,
            value: message,
        },
    ]

    return <ItemOptions options={options} />
}

GiftCardItemOptions.propTypes = {
    message: PropTypes.string,
    recipient: PropTypes.object,
    sender: PropTypes.object,
}
