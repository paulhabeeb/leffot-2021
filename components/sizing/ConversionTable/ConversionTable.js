import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import ConvertedBrand from './ConvertedBrand'
import styles from './ConversionTable.module.scss'

export default function ConversionTable({
    conversions,
    setCurrentStep,
    widths,
}) {
    const { resetForm, values } = useFormikContext()

    const reset = () => {
        resetForm()
        setCurrentStep(0)
        window.scrollTo(0, 0)
    }

    if (values.width === '') {
        return null
    }

    return (
        <>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={reset}>
                    Find another size
                </button>
            </div>
            <div className={styles.container}>
                {conversions.map(brand => (
                    <ConvertedBrand
                        brandName={brand.name}
                        key={brand.name}
                        lasts={brand.lasts}
                        values={values}
                        widths={widths}
                    />
                ))}
            </div>
        </>
    )
}

ConversionTable.propTypes = {
    conversions: PropTypes.array,
    setCurrentStep: PropTypes.func,
    widths: PropTypes.object,
}
