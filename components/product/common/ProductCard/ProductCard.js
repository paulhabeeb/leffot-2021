import PropTypes from 'prop-types'
import { ErrorBoundary } from '@components/common'
import Link from 'next/link'

import { FigureWithMultiply } from '@components/common'
import { Customize } from '@components/icons'
import Body from './Body'
import Hangtag from './Hangtag'
import styles from './ProductCard.module.scss'

export default function ProductCard({ product, spot }) {
    const { fields, images, isArchiveColl, path } = product
    const ariaLabel = `${product.brand.name} ${product.name}`

    return (
        <li data-spot={spot} className='productCard'>
            <ErrorBoundary>
                <div className={styles.productCardArticle}>
                    <Link href={path} className={styles.link}>
                        {(fields.new_until || fields.new_from) && (
                            <Hangtag fields={fields} />
                        )}
                        {isArchiveColl && (
                            <div className={styles.customize}>
                                <Customize styles={styles.customizeIcon} />
                            </div>
                        )}
                        <FigureWithMultiply
                            mainAlt={ariaLabel}
                            images={images}
                            sizes='(max-width: 1040px) 50vw, (max-width: 1200px) 33vw, 25vw'
                        />
                        <Body product={product} fields={fields} />
                    </Link>
                </div>
            </ErrorBoundary>
        </li>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object,
    spot: PropTypes.number,
}
