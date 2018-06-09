import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import StandardPage from '../pages/StandardPage'

export default withRouteData(({ posts }) => (
	<StandardPage>
		<div>
			<h1>Blog</h1>
			<span>All Posts:</span>
    		<ul>
				{posts.map(post => (
					<li key={post.id}>
						<Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	</StandardPage>
))
