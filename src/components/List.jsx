import React from 'react'
//
import '../scss/components/lists.scss'

const List = ({ id, className, children }) => (
    <ul className={"list " + (className||"")}>
        {children}
    </ul>
)
 
export default List