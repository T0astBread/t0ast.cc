import React from 'react'
import { withSiteData } from 'react-static'
//
import StandardPage from '../pages/StandardPage'

export default withSiteData(({ match, location, history }) => (
	<StandardPage>
		<div>
			<h1>Status 404</h1>
			<code>{location.pathname}</code>
			<p>This route doesn't exist</p>
		</div>
	</StandardPage>
))
