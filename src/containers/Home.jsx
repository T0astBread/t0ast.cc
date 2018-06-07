import React from 'react'
import { withSiteData } from 'react-static'
//
import logoImg from '../logo.png'
import NavBar from '../components/NavBar';

export default withSiteData(() => (
	<main>
		<h1 style={{ textAlign: 'center' }}>Welcome to</h1>
		<img src={logoImg} alt="" />
		<NavBar light/>
	</main>
))
