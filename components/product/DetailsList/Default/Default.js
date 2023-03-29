import PropTypes from 'prop-types'

import BeltSizeGuide from '../BeltSizeGuide'
import Description from '../Description'
import DetailItem from '../DetailItem'
import DetailsWrapper from '../DetailsWrapper'
import SizeTable from '../SizeTable'
import styles from './Default.module.scss'

export default function Default({ brand, description, fields, sizeChart }) {
    const hasSizeTable = sizeChart != null

    return (
        <DetailsWrapper>
            {description && <Description description={description} />}
            <div className={styles.list}>
                {fields.features && <DetailItem item={fields.features} />}
                {fields.ingredients && <DetailItem item={fields.ingredients} />}
                {fields.trees && fields.product_type.value === 'Default' && (
                    <DetailItem item={fields.trees} />
                )}
                {fields.size && <DetailItem item={fields.size} />}
                {fields.size_guidance && (
                    <>
                        {hasSizeTable ? (
                            <DetailItem item={fields.size_guidance}>
                                <SizeTable {...sizeChart} />
                            </DetailItem>
                        ) : (
                            <DetailItem item={fields.size_guidance} />
                        )}
                    </>
                )}
                {hasSizeTable && !fields?.size_guidance && (
                    <SizeTable {...sizeChart} />
                )}
                {fields.size_guidance_belt && <BeltSizeGuide brand={brand} />}
                {fields.dimensions && <DetailItem item={fields.dimensions} />}
            </div>
            {fields.can_ship && fields.can_ship.value === 'No' && (
                <p className={styles.canShip}>
                    Sorry, but we cannot ship this item outside North America.
                </p>
            )}
        </DetailsWrapper>
    )
}

Default.propTypes = {
    brand: PropTypes.object,
    description: PropTypes.string,
    fields: PropTypes.object,
    sizeChart: PropTypes.object,
}
