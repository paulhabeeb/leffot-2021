import PropTypes from 'prop-types'
import { CircleLoader } from '@components/placeholders'

export default function Button({
    caption,
    className,
    isSubmitting,
    loaderSize,
    type,
}) {
    return (
        <button className={className} disabled={isSubmitting} type={type}>
            {isSubmitting ? (
                <CircleLoader fill='var(--color-white)' size={loaderSize} />
            ) : (
                caption
            )}
        </button>
    )
}

Button.propTypes = {
    caption: PropTypes.string,
    className: PropTypes.string,
    isSubmitting: PropTypes.bool,
    loaderSize: PropTypes.number,
    type: PropTypes.string,
}

Button.defaultProps = {
    isSubmitting: false,
    loaderSize: 26,
    type: 'submit',
}
