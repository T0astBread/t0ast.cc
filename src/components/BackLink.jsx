import React from 'react'
import { withRouter } from 'react-static';
//
import Link from './Link'
import { getParentOfResource } from "../utils/url_utils";

/**
 * A link that goes back in the browsing history or, if JS is disabled, one segment up in the url or, if the 'to' prop was given to the URL in the to prop
 */
const BackLink = withRouter(({ match, location, history, to }) => {
	const generateUrl = () => getParentOfResource(location.pathname)
	
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