import React from 'react'
//
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default () => (
	<StandardPage>
		<section>
			<h1>About Me</h1>
			<p>No one needs an about page about me</p>
		</section>
		<section>
			<h1>About this Site</h1>
			<p>
				This site is written in JavaScript (JSX) using <Link to="https://react-static.js.org" external newtab>React Static</Link>.
			</p>
		</section>
	</StandardPage>
)
