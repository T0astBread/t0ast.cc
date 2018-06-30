import React from 'react'
import { withSiteData } from 'react-static'
//
import PageHead from '../PageHead';
import NavBar from '../components/NavBar';

export default withSiteData(() => (
	<div>
		<PageHead/>
		<main id="home">
			<NavBar light/>
		</main>
	</div>
))
