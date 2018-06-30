import React from 'react'
import { withSiteData, Head } from 'react-static';

const PageHead = withSiteData(({ title, breadcrumbs, children }) => {
    breadcrumbs = breadcrumbs||[]
    breadcrumbs.push(title)
    return (
        <Head>
            {children}
            <title>{breadcrumbs.join(" // ")}</title>
        </Head>
    )
})

export default PageHead