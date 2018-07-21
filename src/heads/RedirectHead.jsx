import React from 'react'
import {Head, withRouteData} from 'react-static';

const RedirectHead = withRouteData(({target}) => (
	<Head>
		<meta http-equiv="refresh" content={"0; url=" + target} />
	</Head>
))

export default RedirectHead