import React from 'react'
import { Router } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
//

import './scss/app.scss'

const App = () => (
	<Router>
		<Routes />
	</Router>
)

export default hot(module)(App)
