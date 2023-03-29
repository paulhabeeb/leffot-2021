import PropTypes from 'prop-types'
import { CommerceProvider } from '@framework'
import useRouteChange from '@lib/use-route-change'

import { PageLoader } from '@components/placeholders'
import Footer from '../Footer'
import Header from '../Header'
import styles from './Base.module.scss'

export default function Base({ banner, categories, children, footer, locale }) {
    const { routeChanging } = useRouteChange()

    return (
        <CommerceProvider locale={locale}>
            {routeChanging && <PageLoader />}
            <Header banner={banner} categories={categories} />
            <div className={styles.container}>{children}</div>
            <Footer legal={footer.legal} sections={footer.body} />
        </CommerceProvider>
    )
}

Base.defaultProps = {
    locale: 'en-US',
}

Base.propTypes = {
    banner: PropTypes.object,
    categories: PropTypes.array,
    children: PropTypes.node,
    footer: PropTypes.object,
    locale: PropTypes.string,
}
