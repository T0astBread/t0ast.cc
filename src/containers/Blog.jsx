import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import StandardPage from '../pages/StandardPage'
import ListItem2 from '../components/ListItem2';
import List from '../components/List';

export default withRouteData(({ posts }) => (
	<StandardPage>
		<div>
			<h1>Blog</h1>
			<span>All Posts:</span>
			<List>
				{posts.map(post => (
					<li key={post.id}>
						<Link to={`/blog/post/${post.id}/`}>
							<ListItem2
								text1={post.title}
								text2={new Date(post.lastEditDate).toLocaleString()}/>
						</Link>
					</li>
				))}
			</List>
		</div>
	</StandardPage>
))
