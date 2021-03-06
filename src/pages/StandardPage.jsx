import React from 'react'
import {withSiteData} from 'react-static'
//
import "../scss/pages/home.scss"
import PageHead from '../heads/PageHead'
import NavBar from '../components/NavBar'

export default withSiteData(({title, breadcrumbs, keywords, description, children}) => (
    <div>
        <PageHead
            breadcrumbs={breadcrumbs}
            keywords={keywords}
            description={description} />
        <NavBar id="page-nav" />
        <main className="content">
            {children}
        </main>
    </div>
))