import ContentLoader from 'react-content-loader'
import CircleLoader from '../CircleLoader'

import styles from './CartSkeleton.module.scss'

export default function CartSkeleton() {
    const width = 400
    const height = 160

    return (
        <div className={styles.container}>
            <div className={styles.desktop}>
                <ContentLoader
                    speed={2}
                    backgroundColor='#f1f1f1'
                    foregroundColor='#e1e1e1'
                    ariaLabel={'Loading...'}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ width: '100%' }}
                >
                    <rect x='0' y='0' rx='0' ry='0' width='20' height='5' />
                    <rect x='268' y='0' rx='0' ry='0' width='20' height='5' />

                    <rect x='0' y='8' rx='0' ry='0' width='288' height='1' />

                    <rect x='0' y='13' rx='0' ry='0' width='34' height='34' />
                    <rect x='39' y='13' rx='0' ry='0' width='150' height='10' />
                    <rect x='39' y='28' rx='0' ry='0' width='100' height='10' />
                    <rect x='258' y='13' rx='0' ry='0' width='30' height='10' />

                    <rect x='0' y='52' rx='0' ry='0' width='34' height='34' />
                    <rect x='39' y='52' rx='0' ry='0' width='150' height='10' />
                    <rect x='39' y='67' rx='0' ry='0' width='100' height='10' />
                    <rect x='258' y='52' rx='0' ry='0' width='30' height='10' />

                    <rect x='0' y='91' rx='0' ry='0' width='34' height='34' />
                    <rect x='39' y='91' rx='0' ry='0' width='150' height='10' />
                    <rect
                        x='39'
                        y='106'
                        rx='0'
                        ry='0'
                        width='100'
                        height='10'
                    />
                    <rect x='258' y='91' rx='0' ry='0' width='30' height='10' />

                    <rect x='0' y='130' rx='0' ry='0' width='288' height='1' />

                    <rect
                        x='238'
                        y='136'
                        rx='0'
                        ry='0'
                        width='50'
                        height='12'
                    />

                    <rect
                        x='300'
                        y='0'
                        rx='0'
                        ry='0'
                        width='100'
                        height='100'
                    />
                    <rect
                        x='300'
                        y='105'
                        rx='0'
                        ry='0'
                        width='100'
                        height='15'
                    />
                    <rect
                        x='300'
                        y='125'
                        rx='0'
                        ry='0'
                        width='110'
                        height='15'
                    />
                </ContentLoader>
            </div>
            <div className={styles.mobile}>
                <CircleLoader />
            </div>
        </div>
    )
}
