import ContentLoader from 'react-content-loader'

export default function ProductCard() {
    const width = 225
    const height = 225

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
            <rect x="0" y="0" rx="0" ry="0" width="225" height="30" />
            <rect x="0" y="45" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="70" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="95" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="120" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="145" rx="0" ry="0" width="150" height="20" />
            <rect x="0" y="170" rx="0" ry="0" width="150" height="20" />
        </ContentLoader>
    )
}
