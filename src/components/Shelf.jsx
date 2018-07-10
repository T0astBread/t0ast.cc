import React from 'react'
//
import "../scss/components/shelf.scss"
import ShelfItem from './ShelfItem';
import LastShelfItem from './LastShelfItem';

const Shelf = ({ items, languages }) => (
    <ul className="shelf">
        {items.map(item => (
            <li key={item.name}>
                <ShelfItem key={item.name} {...item} language={languages.find(lang => lang.name === item.language)} />
            </li>
        ))}
        <li>
            <LastShelfItem/>
        </li>
    </ul>
)

export default Shelf