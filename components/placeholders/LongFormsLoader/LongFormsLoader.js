import ContentLoader from 'react-content-loader'

import styles from './LongFormsLoader.module.scss'

export default function LongFormsLoader() {
    const width = 400
    const height = 425

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
                <rect x='0' y='0' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='40' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='80' rx='0' ry='0' width='265' height='30' />
                <rect x='275' y='80' rx='0' ry='0' width='125' height='30' />
                <rect x='0' y='145' rx='0' ry='0' width='195' height='30' />
                <rect x='205' y='145' rx='0' ry='0' width='195' height='30' />
                <rect x='0' y='185' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='225' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='265' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='305' rx='0' ry='0' width='126' height='30' />
                <rect x='136' y='305' rx='0' ry='0' width='127' height='30' />
                <rect x='272' y='305' rx='0' ry='0' width='127' height='30' />
                <rect x='0' y='345' rx='0' ry='0' width='550' height='30' />
                <rect x='0' y='385' rx='0' ry='0' width='550' height='30' />
            </ContentLoader>
        </div>
    )
}
