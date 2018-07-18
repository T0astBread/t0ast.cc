import React from 'react'
import { Link } from 'react-static'

const hosts = ["t0ast.cc", "t0ast.netlify.com"]
const linkIsOnHost = link => link && (linkPointsToLocalRoute(link) || urlWithoutProtocolIsOnHost(link))
const linkPointsToLocalRoute = link => !(link.startsWith("http://") || link.startsWith("https://"))
const urlIsOnHost = url => urlWithoutProtocolIsOnHost(stripProtocolFromUrl(url))
const stripProtocolFromUrl = url => url.replace(/^http(s)?:\/\//, "")
const urlWithoutProtocolIsOnHost = url => hosts.some(host => url.startsWith(host))

const EXTERNAL_CLASS_NAME = "external"

const LinkX = props => {
    if (props.external) {
        let newClassName = props.className ?
            `${props.className.toString()} ${EXTERNAL_CLASS_NAME}` :
            EXTERNAL_CLASS_NAME
        props = {...props, className: newClassName}
    }
    if(props.newtab == undefined) {
        props = {...props, newtab: !linkIsOnHost(props.to)}
    }
    if(props.newtab) {
        props = {...props, target: "_blank", rel: "noopener norefferrer"}
    }
    if(!props["aria-label"]) props = {...props, "aria-label": props.children}
    return (
        <span onClick={props.onClick}>
            <Link {...props}/>
        </span>
    )
}

export default LinkX