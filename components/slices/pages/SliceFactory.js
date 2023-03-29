import PropTypes from 'prop-types'

import ContactForm from './ContactForm'
import FAQ from './FAQ'
import LocationHours from './LocationHours'
import Map from './Map'
import Steps from './Steps'
import Table from './Table'
import Text from './Text'
import styles from './SliceFactory.module.scss'

export default function SliceFactory({ slices }) {
    const mainContent = []
    const sidebarContent = []

    slices.forEach((slice, index) => {
        const { slice_type: type } = slice

        // Main
        if (type === 'q_a') {
            mainContent.push(<FAQ slice={slice} key={index} />)
        }
        if (type === 'steps') {
            mainContent.push(<Steps slice={slice} key={index} />)
        }
        if (type === 'table') {
            mainContent.push(<Table slice={slice} key={index} />)
        }
        if (type === 'text') {
            mainContent.push(<Text slice={slice} key={index} />)
        }

        // Sidebar
        if (type === 'contact_form') {
            sidebarContent.push(<ContactForm slice={slice} key={index} />)
        }
        if (type === 'map') {
            sidebarContent.push(<Map slice={slice} key={index} />)
        }
        if (type === 'location_hours') {
            sidebarContent.push(<LocationHours slice={slice} key={index} />)
        }
    })

    return (
        <main className={styles.container} id='main'>
            {mainContent.length > 0 && (
                <article className={styles.contentWrapper}>
                    {mainContent}
                </article>
            )}
            {sidebarContent.length > 0 && (
                <aside className={styles.contentWrapper}>
                    <div className={styles.sidebar}>{sidebarContent}</div>
                </aside>
            )}
        </main>
    )
}

SliceFactory.propTypes = {
    slices: PropTypes.array,
}
