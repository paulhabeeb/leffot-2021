import PropTypes from 'prop-types'

import ConvertedSize from './ConvertedSize'
import ConvertedWidth from './ConvertedWidth'
import LastContainer from './LastContainer'
import NotAvailable from './NotAvailable'
import styles from './ConvertedBrand.module.scss'

const convertWidth = (last, selectedWidth, widths) => {
    if (selectedWidth > last.width.max || selectedWidth < last.width.min) {
        return null
    }

    const widthDigit = (
        parseInt(selectedWidth, 10) + last.width.offset
    ).toString()
    let widthLetter

    widths[last.scale].forEach(width => {
        if (width.value === widthDigit) widthLetter = width.label
    })

    return widthLetter
}

export default function ConvertedBrand({ lasts, brandName, values, widths }) {
    return (
        <>
            {lasts.map((last, index) => {
                const width = convertWidth(last, values.width, widths)

                return (
                    <div className={styles.container} key={index}>
                        <h3 className={styles.title}>{brandName}</h3>
                        <LastContainer name={last.name}>
                            {width ? (
                                <span className={styles.conversion}>
                                    <ConvertedSize
                                        brand={brandName}
                                        selectedSize={values.size}
                                        offset={last.sizeOffset}
                                    />
                                    &thinsp;
                                    <ConvertedWidth
                                        brand={brandName}
                                        width={width}
                                    />
                                </span>
                            ) : (
                                <NotAvailable
                                    brand={brandName}
                                    last={last.name}
                                />
                            )}
                        </LastContainer>
                    </div>
                )
            })}
        </>
    )
}

ConvertedBrand.propTypes = {
    brandName: PropTypes.string,
    lasts: PropTypes.array,
    values: PropTypes.object,
    widths: PropTypes.object,
}
