import React from 'react'
//
import "../scss/components/navbar.scss"
import Link from './Link'

const links = [
    {
        exact: true,
        to: "/"
    },
    {
        to: "/about"
    },
    {
        to: "/repos"
    },
    {
        to: "/shelf"
    },
    {
        to: "/blog"
    },
    {
        to: "https://twitter.com/t0astbread",
        external: true,
        text: "twitter"
    },
    {
        to: "https://github.com/t0astbread",
        external: true,
        text: "github"
    }
]
links.forEach(link => {
    if(!link.external) {
        link.text = link.to === "/" ? link.to : link.to.substring(1)
    }
})

const NavBar = props => (
    <nav className={props.light && "light"} id={props.id}>
        <ul>
            {links.map(link =>
                <li key={link.to}>
                    <Link {...link}>
                        {link.text}
                    </Link>
                </li>
            )}
        </ul>
    </nav>
)

export default NavBar