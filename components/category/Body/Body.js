import PropTypes from 'prop-types'

import { SearchError } from '@components/common'
import { SidebarAndGridWrapper } from '@components/layout'
import ProductsWithSidebar from './ProductsWithSidebar'
import styles from './Body.module.scss'

export default function Body({ filters, products }) {
    if (products.length < 1) {
        return (
            <SearchError
                caption='We can’t find any products that match your selection. You might try searching the site for something else.'
                title='There’s nothing here'
            />
        )
    }

    return (
        <div className={styles.container}>
            <SidebarAndGridWrapper id='main'>
                <ProductsWithSidebar
                    initFilters={filters}
                    initProducts={products}
                />
            </SidebarAndGridWrapper>
        </div>
    )
}

Body.propTypes = {
    filters: PropTypes.array,
    products: PropTypes.array,
}
