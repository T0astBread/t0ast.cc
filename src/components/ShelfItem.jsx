import React from 'react'
//
import "../scss/components/shelf.scss"
import Link from "./Link"

const ShelfItem = ({ name, website, description, language }) => {
    return (
        <div className="shelf-item">
            <h5>
                <Link to={website}>{name}</Link>
            </h5>
            <p>{description}</p>
            <div className="language-display">
                <div className="color-dot" style={{backgroundColor: language.color}}></div>
                <span className="name">{language.name}</span>
            </div>
        </div>
    )
}
 
export default ShelfItem