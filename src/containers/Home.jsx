import React from 'react'
import {withSiteData} from 'react-static'
//
import PageHead from '../heads/PageHead';
import NavBar from '../components/NavBar';

export default withSiteData(() => (
	<div>
		<PageHead description="This is my website" />
		<main id="home">
			<NavBar light />
		</main>
	</div>
))
