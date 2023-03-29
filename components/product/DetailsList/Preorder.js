import PropTypes from 'prop-types'
import Callout from './Callout'
import Default from './Default'
import DetailsWrapper from './DetailsWrapper'

export default function Preorder({ description, fields, sizeChart }) {
    return (
        <DetailsWrapper>
            {fields.pre_sizeRun && (
                <Callout
                    description={fields.pre_sizeRun.value}
                    title='Please Note'
                />
            )}
            <Default
                description={description}
                fields={fields}
                sizeChart={sizeChart}
            />
        </DetailsWrapper>
    )
}

Preorder.propTypes = {
    description: PropTypes.string,
    fields: PropTypes.object,
    sizeChart: PropTypes.object,
}
