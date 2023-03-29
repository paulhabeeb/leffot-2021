import getPageLayoutData from '@lib/queries/layout-props'

import { PageNotFound } from '@components/common'

export default function Custom404(props) {
    return <PageNotFound {...props} />
}

export async function getStaticProps() {
    const [header, footer, siteBanner] = await getPageLayoutData()

    return {
        props: {
            footer,
            header,
            siteBanner,
        },
        revalidate: 120,
    }
}
