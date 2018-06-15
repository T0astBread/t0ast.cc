import React from 'react'
import { withRouteData } from 'react-static'
import ReactMarkdown from 'react-markdown'
//
import "../scss/containers/post.scss"
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';
import FirebaseReactMarkdown from '../components/FirebaseReactMarkdown';

export default withRouteData(({ post }) => (
	<StandardPage>
		<div>
			<Link to="/blog" className="back">Back</Link>
			<h1>{post.title}</h1>
			<FirebaseReactMarkdown text={post.body}/>
		</div>
	</StandardPage>
))
