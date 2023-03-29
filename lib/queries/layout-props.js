import { queryBanner, queryFooter, queryHeader } from './prismic'

const getPageLayoutData = async () => {
    const [header, footer, banner] = await Promise.all([
        queryHeader(),
        queryFooter(),
        queryBanner('banner'),
    ])

    return [header, footer, banner]
}

export default getPageLayoutData
