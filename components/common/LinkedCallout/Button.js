import PropTypes from 'prop-types'
import Link from 'next/link'
import linkResolver from '@lib/link-resolver'
import styles from './Button.module.scss'

export default function Button({ buttonText, linkUrl, toggleModal }) {
    if (toggleModal !== null) {
        return (
            <button className={styles.button} onClick={toggleModal}>
                {buttonText}
            </button>
        )
    }

    if (linkUrl !== null) {
        return (
            <Link href={linkResolver(linkUrl)} className={styles.button}>
                {buttonText}
            </Link>
        )
    }

    return <span>{buttonText}</span>
}

Button.propTypes = {
    buttonText: PropTypes.string,
    linkUrl: PropTypes.object,
    toggleModal: PropTypes.func,
}
