import React from 'react'
//
import StandardPage from '../pages/StandardPage';
import NotImplemented from '../components/NotImplemented.jsx'
import BackLink from '../components/BackLink.jsx'

const NotImplementedPage = () => (
	<StandardPage>
		<NotImplemented />
		<BackLink />
	</StandardPage>
)

export default NotImplementedPage