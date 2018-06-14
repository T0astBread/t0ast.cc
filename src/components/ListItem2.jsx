import React from 'react'
//
import '../styles/lists.scss'
import '../styles/styles/typography.scss'

const ListItem2 = ({ text1, text2 }) => (
    <div className="list-item-2">
        <h5 className="text-1">{text1}</h5>
        <span className="text-2">{text2}</span>
    </div>
)
 
export default ListItem2