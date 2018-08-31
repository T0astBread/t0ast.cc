import React from 'react'
import {withSiteData, Head} from 'react-static';
//
import GoogleSiteVerificationHead from './GoogleSiteVerificationHead'

const PageHead = withSiteData(({title, breadcrumbs, keywords, description, children}) => {
    breadcrumbs = breadcrumbs || []

    keywords = keywords || []
    keywords.push("t0ast", "t0astbread", "software", "development")

    breadcrumbs.push(title)
    return [
        <Head>
            {children}
            <meta name="keywords" content={keywords.join(", ")} />
            {description && <meta name="description" content={description} />}
            <title>{breadcrumbs.join(" // ")}</title>
        </Head>,
        <GoogleSiteVerificationHead />
    ]
})

export default PageHead