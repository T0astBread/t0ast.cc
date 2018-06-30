import React from 'react'
import { withSiteData } from 'react-static'
//
import "../scss/pages/home.scss"
import PageHead from '../PageHead'
import NavBar from '../components/NavBar'

export default withSiteData(({ title, breadcrumbs, children }) => (
    <div>
        <PageHead breadcrumbs={breadcrumbs}/>
        <NavBar id="page-nav"/>
        <main className="content">
            {children}
        </main>
    </div>
))