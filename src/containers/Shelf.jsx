import React from 'react'
//
import StandardPage from '../pages/StandardPage';
import Shelf from '../components/Shelf';
//
import shelfItems from '../data/shelf/items.json'

export default () => (
    <StandardPage breadcrumbs={["shelf"]}>
        <h1>Shelf</h1>
        <p>A "display shelf" for finished and polished works. Get this stuff!</p>
        <Shelf {...shelfItems} />
    </StandardPage>
)
