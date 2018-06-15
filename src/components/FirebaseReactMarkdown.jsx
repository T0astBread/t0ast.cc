import React from 'react'
import ReactMarkdown from 'react-markdown'

const FirebaseReactMarkdown = ({ text }) => (
    <ReactMarkdown source={text}
        transformImageUri={uri => {
            return `https://firebasestorage.googleapis.com/v0/b/t0ast-cc.appspot.com/o/blogmedia%2Fimages%2F${uri}?alt=media`
        }}
        escapeHtml={true}/>
)
 
export default FirebaseReactMarkdown