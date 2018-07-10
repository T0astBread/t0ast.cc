import React from 'react'
//
import "../scss/components/shelf.scss"
import Link from "./Link"

const hosts = ["t0ast.cc", "t0ast.netlify.com"]
const urlWithoutProtocolIsOnHost = url => hosts.some(host => url.startsWith(host))

const ShelfItem = ({ name, website, description, language }) => {
    const urlIsLocal = website && urlWithoutProtocolIsOnHost(website.replace(/^http(s)?:\/\//, ""))
    return (
        <div className="shelf-item">
            <h5>
                <Link to={website} newtab={!urlIsLocal}>{name}</Link>
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