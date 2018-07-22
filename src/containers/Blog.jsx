import React from 'react'
import {withRouteData, Link} from 'react-static'
//
import StandardPage from '../pages/StandardPage'
import ListItem2 from '../components/ListItem2';
import List from '../components/List';

export default withRouteData(({posts}) => (
	<StandardPage
		breadcrumbs={["blog"]}
		keywords={["blog"]}
		description={"Here I write about technical stuff I learnt or found out about"}>
		<h1>Blog</h1>
		<span>All Posts:</span>
		<List>
			{posts.map(post => (
				<li key={post.id}>
					<Link to={`/blog/posts/${post.id}`}>
						<ListItem2
							text1={post.title}
							text2={post.lastEditDate} />
					</Link>
				</li>
			))}
		</List>
	</StandardPage>
))
