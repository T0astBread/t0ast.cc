import React from 'react'
//
import '../styles/lists.scss'

const List = ({ id, className, children }) => (
    <ul className={"list " + (className||"")}>
        {children}
    </ul>
)
 
export default List