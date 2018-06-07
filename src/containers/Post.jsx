import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import StandardPage from '../pages/StandardPage'

export default withRouteData(({ post }) => (
	<StandardPage>
		<div>
			<Link to="/blog/">{'<'} Back</Link>
			<br />
			<h3>{post.title}</h3>
			<p>{post.body}</p>
		</div>
	</StandardPage>
))
