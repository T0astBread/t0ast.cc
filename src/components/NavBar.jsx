import React from 'react'
//
import "../scss/components/navbar.scss"
import Link from './Link'

const NavBar = props => (
    <nav className={props.light && "light"} id={props.id}>
        <Link exact to="/">/</Link>
        <Link to="/about">about</Link>
        <Link to="/blog">blog</Link>
        <Link to="https://twitter.com/t0astbread" external newtab>twitter</Link>
        <Link to="https://github.com/t0astbread" external newtab>github</Link>
    </nav>
)

export default NavBar