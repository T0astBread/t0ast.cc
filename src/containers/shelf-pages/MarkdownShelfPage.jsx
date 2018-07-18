import React from 'react'
import { withRouteData } from 'react-static';
import ReactMarkdown from 'react-markdown'
//
import StandardPage from '../../pages/StandardPage'
import BackLink from '../../components/BackLink'
import Link from '../../components/Link'

const MarkdownShelfPage = withRouteData(({ itemName, content }) => {
    return (
        <StandardPage breadcrumbs={[itemName, "shelf"]}>
            <BackLink/>
            <ReactMarkdown
                source={content}
                renderers={{
                    link: ({ href, children }) => <Link to={href}>{children}</Link>
                }} />
        </StandardPage>
    )
})

export default MarkdownShelfPage