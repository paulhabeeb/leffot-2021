import PropTypes from 'prop-types'

import { ButtonLoader } from '@components/placeholders'
import styles from './Paginator.module.scss'

function ViewMoreButton({ context, onClick, pagination }) {
    const { current_page, total_pages } = pagination

    if (current_page < total_pages) {
        return (
            <button
                className={styles.button}
                onClick={() => onClick(current_page + 1)}
            >
                View more
            </button>
        )
    }

    if (current_page > 1 && current_page === total_pages) {
        return (
            <div className={styles.message}>
                There are no more {context} to show.
            </div>
        )
    }

    return null
}

ViewMoreButton.propTypes = {
    context: PropTypes.string,
    onClick: PropTypes.func,
    pagination: PropTypes.object,
}

export default function Paginator({ context, isLoading, onClick, pagination }) {
    return (
        <div className={styles.container}>
            {isLoading ? (
                <ButtonLoader />
            ) : (
                <ViewMoreButton
                    context={context}
                    onClick={onClick}
                    pagination={pagination}
                />
            )}
        </div>
    )
}

Paginator.propTypes = {
    context: PropTypes.string,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    pagination: PropTypes.shape({
        current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        next: PropTypes.string,
    }),
}
