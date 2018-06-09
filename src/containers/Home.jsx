import React from 'react'
import { withSiteData } from 'react-static'
//
import NavBar from '../components/NavBar';

export default withSiteData(() => (
	<main id="home">
		<NavBar light/>
	</main>
))
