import PropTypes from 'prop-types'

import LargeModal from '@components/modals/LargeModal'
import { CircleLoader } from '@components/placeholders'
import styles from './MobileFilters.module.scss'

export default function MobileFilters({
    children,
    isLoading,
    isOpen,
    toggleFilters,
}) {
    return (
        <LargeModal
            id='mobile_filters_modal'
            isOpen={isOpen}
            toggleModal={toggleFilters}
        >
            <div id='mobile_filters_modal_top'></div>
            <button className={styles.button} onClick={toggleFilters}>
                Done
            </button>
            {isLoading && (
                <div className={styles.overlay}>
                    <div className={styles.loader}>
                        <CircleLoader />
                    </div>
                </div>
            )}
            {children}
        </LargeModal>
    )
}

MobileFilters.defaultProps = {
    isLoading: false,
}

MobileFilters.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    isOpen: PropTypes.bool,
    toggleFilters: PropTypes.func,
}
