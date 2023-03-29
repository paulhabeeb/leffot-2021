import PropTypes from 'prop-types'
import styles from './Breadcrumbs.module.scss'

const getBreadcrumbs = (categories, path) => {
    // The path include the product name, so we remove that
    const trimmedPath = path.replace(/[^\/]+\/*$/, '') // eslint-disable-line no-useless-escape

    // Default breadcrumbs in case we don't match anything
    let breadcrumbs = categories[0].breadcrumbs

    categories.forEach(category => {
        if (category.path === trimmedPath) {
            breadcrumbs = category.breadcrumbs
        }
    })

    return breadcrumbs
}

function Breadcrumb({ breadcrumb, index }) {
    return (
        <li
            className={styles.breadcrumb}
            itemProp='itemListElement'
            itemScope
            itemType='http://schema.org/ListItem'
        >
            <meta itemProp='position' content={index} />
            <span className={styles.breadcrumbLink} itemProp='name'>
                {breadcrumb.name}
            </span>
        </li>
    )
}

Breadcrumb.propTypes = {
    breadcrumb: PropTypes.object,
    index: PropTypes.number,
}

export default function Breadcrumbs({ categories, path }) {
    if (categories.length < 1) {
        return null
    }

    const breadcrumbs = getBreadcrumbs(categories, path)
    const crumbs = []
    breadcrumbs.forEach((crumb, index) => {
        crumbs.push(<Breadcrumb breadcrumb={crumb} index={index} key={index} />)
    })

    return (
        <nav aria-label='Breadcrumbs'>
            <ul
                className={styles.breadcrumbs}
                itemScope
                itemType='http://schema.org/BreadcrumbList'
            >
                {crumbs}
            </ul>
        </nav>
    )
}

Breadcrumbs.propTypes = {
    categories: PropTypes.array,
    path: PropTypes.string,
}
