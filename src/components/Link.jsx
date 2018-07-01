import React from 'react'
import { Link } from 'react-static'

const EXTERNAL_CLASS_NAME = "external"

const LinkX = props => {
    if (props.external) {
        let newClassName = props.className ?
            `${props.className.toString()} ${EXTERNAL_CLASS_NAME}` :
            EXTERNAL_CLASS_NAME
        props = {...props, className: newClassName}
    }
    if(props.newtab) {
        props = {...props, target: "_blank", rel: "noopener norefferrer"}
    }
    if(!props["aria-label"]) props = {...props, "aria-label": props.children}
    return Link(props)
}

export default LinkX