import PropTypes from 'prop-types'
import Wrapper from '../Wrapper'

export default function ArchiveColl({ context, price }) {
    return <Wrapper context={context}>Customize from {price}</Wrapper>
}

ArchiveColl.propTypes = {
    context: PropTypes.string,
    price: PropTypes.string,
}
