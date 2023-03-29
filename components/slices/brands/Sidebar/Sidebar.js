import PropTypes from 'prop-types'

import Details from './Details'
import Events from './Events'
import SidebarItem from './SidebarItem'
import styles from './Sidebar.module.scss'

export default function Sidebar({ events, slice }) {
    return (
        <aside className={styles.aside}>
            <div className={styles.container}>
                {slice && (
                    <SidebarItem title='Details'>
                        <Details slice={slice} />
                    </SidebarItem>
                )}
                <SidebarItem title='Upcoming Events'>
                    <Events events={events} />
                </SidebarItem>
            </div>
        </aside>
    )
}

Sidebar.propTypes = {
    events: PropTypes.array,
    slice: PropTypes.object,
}
