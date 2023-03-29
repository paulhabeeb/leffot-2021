import PropTypes from 'prop-types'
import styles from './Footer.module.scss'
import FooterNav from './FooterNav'
import Legal from './Legal'

export default function Footer({ legal, sections }) {
    return (
        <>
            <footer className={styles.footer}>
                <FooterNav sections={sections} />
                <Legal data={legal} />
            </footer>
            <div className='mobile-overlay'></div>
        </>
    )
}

Footer.propTypes = {
    legal: PropTypes.array,
    sections: PropTypes.array,
}
