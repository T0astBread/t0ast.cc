import React from 'react'
import { withRouter } from 'react-static';
//
import Link from './Link'

/**
 * A link that goes back in the browsing history or, if JS is disabled, one segment up in the url or, if the 'to' prop was given to the URL in the to prop
 */
const BackLink = withRouter(({ match, location, history, to }) => {
	const generateUrl = () => {
		const locationPathSegments = location.pathname.split("/")
		const backUrl = locationPathSegments.slice(0, locationPathSegments.length - 1).join("/")
		return backUrl
	}
	
	return (
		<Link
			to={to || generateUrl()}
			className="back"
			onClick={evt => {
				window.history.back()
				evt.stopPropagation()
				evt.preventDefault()
			}}>
			Back
		</Link>
	)
})

export default BackLink