import PropTypes from 'prop-types'

import InfoBlip from '../InfoBlip'

export default function Address({ address, title }) {
    if (!address) {
        return null
    }

    const {
        city,
        company,
        country,
        first_name,
        last_name,
        state,
        street_1,
        street_2,
        zip,
    } = address

    return (
        <InfoBlip title={title}>
            <div>
                <div>
                    {first_name} {last_name}
                </div>
                <div>{company}</div>
                <div>{street_1}</div>
                <div>{street_2}</div>
                <div>
                    {city}, {state} {zip}
                </div>
                <div>{country}</div>
            </div>
        </InfoBlip>
    )
}

Address.propTypes = {
    address: PropTypes.object,
    title: PropTypes.string,
}
