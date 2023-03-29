import PropTypes from 'prop-types'

import styles from './MainVideo.module.scss'

export default function MainVideo({ video }) {
    return (
        <div className={styles.container}>
            <iframe
                className={styles.frame}
                src={`//www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title_long}
                type='text/html'
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen
            />
        </div>
    )
}

MainVideo.propTypes = {
    video: PropTypes.object,
}
