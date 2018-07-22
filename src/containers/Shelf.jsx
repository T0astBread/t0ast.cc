import React from 'react'
//
import StandardPage from '../pages/StandardPage';
import Shelf from '../components/Shelf';
//
import {isInDevMode} from '../utils/config'
// import shelfItems from '../data/shelf/production/items.json'
const shelfItems = require(`../data/shelf/${isInDevMode() ? "dev" : "production"}/items.json`)

export default () => (
    <StandardPage
        breadcrumbs={["shelf"]}
        keywords={["projects", "showcase"]}
        description={"A \"display shelf\" for finished and polished works. Get this stuff!"}>
        <h1>Shelf</h1>
        <p>A "display shelf" for finished and polished works. Get this stuff!</p>
        <Shelf {...shelfItems} />
    </StandardPage>
)
