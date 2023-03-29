import PropTypes from 'prop-types'

import styles from './SidebarDetail.module.scss'

export default function SidebarDetail({
    caption,
    captionTwo,
    children,
    title,
}) {
    if (caption) {
        return (
            <div>
                <h2 className={styles.subtitle}>{title}</h2>
                <div className={styles.caption}>
                    {caption}
                    {captionTwo}
                </div>
                {children}
            </div>
        )
    }

    return null
}

SidebarDetail.propTypes = {
    caption: PropTypes.oneOfType([
        PropTypes.shape({
            text: PropTypes.string,
        }),
        PropTypes.string,
    ]),
    captionTwo: PropTypes.object,
    children: PropTypes.node,
    title: PropTypes.string,
}
