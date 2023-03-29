import { useState } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Options from './Options'
import StickyBar from './StickyBar'

export default function OptionsAndButton({
    checkboxToggles,
    initCheckboxToggleState,
    product,
}) {
    const [checkboxToggleState, setCheckboxToggleState] = useState(
        initCheckboxToggleState
    )
    const { inventory, isArchiveColl, isAvailable } = product

    const button = <Button {...product} />

    return (
        <>
            {isAvailable && inventory.isInStock && (
                <Options
                    checkboxToggles={checkboxToggles}
                    checkboxToggleState={checkboxToggleState}
                    setCheckboxToggleState={setCheckboxToggleState}
                    product={product}
                />
            )}
            {isArchiveColl ? (
                <StickyBar
                    button={button}
                    checkboxToggleState={checkboxToggleState}
                    product={product}
                />
            ) : (
                <>{button}</>
            )}
        </>
    )
}

OptionsAndButton.propTypes = {
    checkboxToggles: PropTypes.array,
    initCheckboxToggleState: PropTypes.object,
    product: PropTypes.object,
}
