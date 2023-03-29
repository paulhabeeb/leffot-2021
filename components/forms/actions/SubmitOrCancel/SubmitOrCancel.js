import PropTypes from 'prop-types'
import Link from 'next/link'
import cn from 'classnames'

import { Button } from '@components/forms/actions'
import styles from './SubmitOrCancel.module.scss'

export default function SubmitOrCancel({
    cancelAction,
    isSubmitting,
    style,
    submitCaption,
}) {
    const primaryButtonStyle = cn({
        [styles.submit]: style === 'primary',
        [styles.delete]: style === 'delete',
    })

    const cancelIsFunction = typeof cancelAction === 'function'

    return (
        <div className={styles.actions}>
            <Button
                caption={submitCaption}
                className={primaryButtonStyle}
                isSubmitting={isSubmitting}
            />
            {cancelIsFunction ? (
                <button
                    className={styles.cancel}
                    onClick={cancelAction}
                    onKeyPress={cancelAction}
                    type='button'
                >
                    Cancel
                </button>
            ) : (
                <Link href={cancelAction} className={styles.cancel}>
                    Cancel
                </Link>
            )}
        </div>
    )
}

SubmitOrCancel.defaultProps = {
    style: 'primary',
}

SubmitOrCancel.propTypes = {
    cancelAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    isSubmitting: PropTypes.bool,
    style: PropTypes.string,
    submitCaption: PropTypes.string,
}
