import PropTypes from 'prop-types'

import Options from './Options'
import OptionsHeader from './OptionsHeader'
import Sidebar from './Sidebar'
import styles from './SliceFactory.module.scss'

export default function SliceFactory({ slices, events }) {
    const mainContent = []
    const sidebarContent = []

    slices.forEach((slice, index) => {
        if (slice.slice_type === 'details') {
            sidebarContent.push(
                <Sidebar events={events} slice={slice} key={index} />
            )
        }
        if (slice.slice_type === 'options_header') {
            mainContent.push(<OptionsHeader slice={slice} key={index} />)
        }
        if (slice.slice_type === 'options') {
            mainContent.push(<Options slice={slice} key={index} />)
        }
    })

    return (
        <div className={styles.container}>
            {sidebarContent}
            <div>{mainContent}</div>
        </div>
    )
}

SliceFactory.propTypes = {
    slices: PropTypes.array,
    events: PropTypes.array,
}
