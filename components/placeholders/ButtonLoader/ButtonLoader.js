import styles from './ButtonLoader.module.scss'

export default function ButtonLoader() {
    return (
        <div>
            <span>
                <span className={styles.loader1} />
                <span className={styles.loader2} />
                <span className={styles.loader3} />
            </span>
        </div>
    )
}
