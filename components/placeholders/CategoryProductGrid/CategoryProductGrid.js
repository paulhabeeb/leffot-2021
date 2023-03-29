import ProductCard from './ProductCard'
import SidebarFilter from './SidebarFilter'
import styles from './CategoryProductGrid.module.scss'

export default function CategoryProductGrid() {
    const sidebarLoaders = []
    for (let i = 0; i < 3; i++) {
        sidebarLoaders.push(<SidebarFilter key={i} />)
    }

    const productLoaders = []
    for (let i = 0; i < 15; i++) {
        productLoaders.push(<ProductCard key={i} />)
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>{sidebarLoaders}</aside>
            <main className={styles.products}>
                <div className={styles.grid}>{productLoaders}</div>
            </main>
        </div>
    )
}
