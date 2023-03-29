import PropTypes from 'prop-types'
import styles from './SkipNav.module.scss'

export default function SkipNav({ link }) {
    return (
        <section>
            <a href={link} className={styles.skipNav}>
                Skip to main content
            </a>
        </section>
    )
}

SkipNav.propTypes = {
    link: PropTypes.string,
}
