import PropTypes from 'prop-types'

import HeaderContainer from '../HeaderContainer'
import ProductHeaderMessage from '../ProductHeaderMessage'
import ProductTitle from '../ProductTitle'
import styles from './ArchiveHeader.module.scss'

export default function ArchiveHeader({ brand, productName, releaseDate }) {
    return (
        <HeaderContainer>
            <ProductTitle
                productName={`Customize your ${brand.name} ${productName}`}
            />
            <div className={styles.eta}>
                <ProductHeaderMessage message={`Ships ${releaseDate}`} />
            </div>
        </HeaderContainer>
    )
}

ArchiveHeader.propTypes = {
    brand: PropTypes.object,
    productName: PropTypes.string,
    releaseDate: PropTypes.string,
}
