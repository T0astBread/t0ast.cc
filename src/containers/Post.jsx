import React from 'react'
import { withRouteData } from 'react-static'
//
import "../scss/containers/post.scss"
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default withRouteData(({ post }) => (
	<StandardPage>
		<div>
			<Link to="/blog" className="back">Back</Link>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	</StandardPage>
))
