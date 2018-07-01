import React from 'react'
import { withRouteData } from 'react-static'
import ReactMarkdown from 'react-markdown'
//
import "../scss/containers/post.scss"
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default withRouteData(({ post }) => (
	<StandardPage breadcrumbs={[post.id, "blog"]}>
		<article className="post">
			<Link to="/blog" className="back">Back</Link>
			<header>
				<h1>{post.title}</h1>
				<small>
					<span>Last Edited: <time>{post.lastEditDate}</time></span>
					<Link to={post.githubUrl} external newtab>Edit this post on GitHub</Link>
				</small>
			</header>
			<main>
				<ReactMarkdown source={post.body} />
			</main>
		</article>
	</StandardPage>
))
