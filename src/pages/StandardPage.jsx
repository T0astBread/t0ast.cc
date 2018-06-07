import React from 'react'
import NavBar from '../components/NavBar';

const NavPage = props => (
    <div>
        <NavBar/>
        <main>
            {props.children}
        </main>
    </div>
)
 
export default NavPage