import { useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import Tippy from '@tippyjs/react'
import updateImgOnSelect from '@lib/products/update-img-on-select'

import { useProductContext } from '@components/product'
import HoverSwatchTooltip from './HoverSwatchTooltip'
import styles from './HoverSwatchInput.module.scss'

export default function HoverSwatchInput({
    altText,
    disabled,
    handleClick,
    id,
    imgUrls,
    label,
    mainImgUrl,
    name,
    selected,
    shouldUpdateImgOnSelect,
    updateMainImgUrl,
    value,
}) {
    const [myTippy, setMyTippy] = useState(null)
    const onCreate = tippy => setMyTippy(tippy)
    const hideTippy = () => myTippy.hide()

    const [field] = useField({
        name,
        type: 'radio',
        value: value.entityId.toString(),
    })

    const { defaultImage, setImageIsLoading, setDefaultImage } =
        useProductContext()

    const newHandleClick = event => {
        if (shouldUpdateImgOnSelect) {
            updateImgOnSelect(
                {
                    label,
                    labelType: 'color',
                    altText,
                },
                [mainImgUrl, updateMainImgUrl],
                [setImageIsLoading, defaultImage, setDefaultImage]
            )
        }

        handleClick(event)
    }

    const handleMobileSelect = event => {
        event.preventDefault()

        window.setTimeout(newHandleClick, 1000, event)
        window.setTimeout(hideTippy, 3000)
    }

    const tippyContent = (
        <HoverSwatchTooltip
            altText={altText}
            handleMobileSelect={handleMobileSelect}
            imgUrl={imgUrls.large}
            label={label}
        />
    )

    return (
        <div>
            <input
                {...field}
                checked={field.checked && selected}
                className='visuallyHidden'
                disabled={disabled}
                id={id}
                onClick={newHandleClick}
                type='radio'
            />
            <label className={styles.hoverSwatch} htmlFor={id}>
                <Tippy
                    content={tippyContent}
                    duration={0}
                    interactive={true}
                    onCreate={onCreate}
                >
                    <img src={imgUrls.small} alt={altText} />
                </Tippy>
                <span className='visuallyHidden'>{label}</span>
            </label>
        </div>
    )
}

HoverSwatchInput.defaultProps = {
    disabled: false,
    selected: true,
}

HoverSwatchInput.propTypes = {
    altText: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func,
    id: PropTypes.string,
    imgUrls: PropTypes.object,
    label: PropTypes.string,
    mainImgUrl: PropTypes.object,
    name: PropTypes.string,
    selected: PropTypes.bool,
    shouldUpdateImgOnSelect: PropTypes.bool,
    updateMainImgUrl: PropTypes.func,
    value: PropTypes.object,
}
