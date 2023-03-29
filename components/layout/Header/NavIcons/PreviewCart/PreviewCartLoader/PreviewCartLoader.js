import { CircleLoader } from '@components/placeholders'
import styles from './PreviewCartLoader.module.scss'

export default function PreviewCartLoader() {
    return (
        <div className={styles.loading}>
            <CircleLoader />
        </div>
    )
}
