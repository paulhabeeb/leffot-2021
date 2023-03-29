import ContentLoader from 'react-content-loader'

import styles from './SingleOrder.module.scss'

export default function SingleOrder() {
    const bottomHeight = 200
    const topHeight = 130
    const width = 600

    return (
        <div className={styles.container}>
            <div className={styles.desktop}>
                <ContentLoader
                    speed={2}
                    backgroundColor='#f1f1f1'
                    foregroundColor='#e1e1e1'
                    ariaLabel={'Loading...'}
                    viewBox={`0 0 ${width} ${topHeight}`}
                    style={{ width: '100%' }}
                >
                    <rect x='0' y='13' rx='0' ry='0' width='100' height='17' />
                    <rect x='0' y='35' rx='0' ry='0' width='600' height='20' />
                    <rect x='0' y='60' rx='0' ry='0' width='600' height='20' />
                    <rect x='0' y='85' rx='0' ry='0' width='600' height='20' />
                    <rect x='0' y='110' rx='0' ry='0' width='600' height='20' />
                </ContentLoader>
            </div>
            <div className={styles.mobile}>
                <ContentLoader
                    speed={2}
                    backgroundColor='#f1f1f1'
                    foregroundColor='#e1e1e1'
                    ariaLabel={'Loading...'}
                    style={{ width: '100%' }}
                    viewBox={`0 0 ${width} ${bottomHeight}`}
                >
                    <rect x='0' y='10' rx='0' ry='0' width='150' height='30' />
                    <rect x='0' y='50' rx='0' ry='0' width='600' height='30' />
                    <rect x='0' y='90' rx='0' ry='0' width='600' height='30' />
                    <rect x='0' y='130' rx='0' ry='0' width='600' height='30' />
                    <rect x='0' y='170' rx='0' ry='0' width='600' height='30' />
                </ContentLoader>
            </div>
        </div>
    )
}
