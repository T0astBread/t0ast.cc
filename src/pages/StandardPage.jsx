import React from 'react'
import NavBar from '../components/NavBar'
//
import "../styles/home.scss"

const NavPage = props => (
    <div>
        <NavBar id="page-nav"/>
        <main className="content">
            {props.children}
        </main>
    </div>
)
 
export default NavPage