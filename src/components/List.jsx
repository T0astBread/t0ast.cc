import React from 'react'
//
import '../scss/components/lists.scss'
import placeholder from '../media/images/unused_character_face.png'

const List = ({ id, className, children }) => {
    if(children && children.length > 0) return listWithElements(className, children)
    return emptyList(id, className)
}

const listWithElements = (id, className, children) => (
    <ul className={"list " + (className||"")} id={id}>
        {children}
    </ul>
)

const emptyList = (id, className) => (
    <div className={"empty-list " + (className||"")} id={id}>
        <div className="empty-list-placeholder">
            <img src={placeholder} alt={"Unused Character from Kill Me Baby"}/>
            <span>This list is empty</span>
        </div>
    </div>
)
 
export default List