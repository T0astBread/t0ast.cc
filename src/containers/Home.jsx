import React from 'react'
import {withSiteData} from 'react-static'
//
import PageHead from '../heads/PageHead';
import NavBar from '../components/NavBar';

export default withSiteData(() => (
	<div>
		<PageHead description="This is my website where I show my software projects and related stuff" />
		<main id="home">
			<NavBar light />
		</main>
	</div>
))
