import ContentLoader from 'react-content-loader'

export default function ProductCard() {
    const width = 200
    const height = 300

    return (
        <ContentLoader
            speed={2}
            backgroundColor="#f1f1f1"
            foregroundColor="#e1e1e1"
            animate={true}
            aria-label={'Loading...'}
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: '100%' }}
        >
            <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
            <rect x="0" y="210" rx="0" ry="0" width="166" height="25" />
            <rect x="0" y="245" rx="0" ry="0" width="100" height="20" />
        </ContentLoader>
    )
}
