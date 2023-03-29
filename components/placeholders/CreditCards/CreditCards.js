import ContentLoader from 'react-content-loader'

import styles from './CreditCards.module.scss'

export default function CreditCards() {
    const width = 500
    const height = 160

    return (
        <div className={styles.container}>
            <ContentLoader
                speed={2}
                backgroundColor='#f1f1f1'
                foregroundColor='#e1e1e1'
                ariaLabel={'Loading...'}
                viewBox={`0 0 ${width} ${height}`}
                style={{ width: '100%' }}
            >
                <rect x='0' y='35' rx='0' ry='0' width='500' height='40' />
                <rect x='0' y='85' rx='0' ry='0' width='500' height='40' />
                <rect x='0' y='0' rx='0' ry='0' width='149' height='25' />
            </ContentLoader>
        </div>
    )
}
