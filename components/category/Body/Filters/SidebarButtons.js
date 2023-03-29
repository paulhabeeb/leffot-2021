import PropTypes from 'prop-types'

import { MobileFilterButtons } from '@components/common/Filters'
import { Filter, Grid, List } from '@components/icons'

export default function SidebarButtons({
    isOneCol,
    toggleFilters,
    toggleViewStyle,
}) {
    const filterButton = (
        <button onClick={toggleFilters}>
            <Filter />
            <span>Filter</span>
        </button>
    )

    const viewStyleButton = (
        <button onClick={toggleViewStyle}>
            {!isOneCol ? (
                <>
                    <List />
                    <span>View as list</span>
                </>
            ) : (
                <>
                    <Grid />
                    <span>View as grid</span>
                </>
            )}
        </button>
    )

    return <MobileFilterButtons buttons={[filterButton, viewStyleButton]} />
}

SidebarButtons.propTypes = {
    isOneCol: PropTypes.bool,
    toggleFilters: PropTypes.func,
    toggleViewStyle: PropTypes.func,
}
