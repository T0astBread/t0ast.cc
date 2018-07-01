import React from 'react'
//
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default () => (
	<StandardPage breadcrumbs={["about"]}>
		<h1>About</h1>
		<section>
			<h2>About Me</h2>
			<p>No one needs an about page about me</p>
		</section>
		<section>
			<h2>About this Site</h2>
			<p>
				This site is written in JavaScript (JSX) using <Link to="https://react-static.js.org" external newtab>React Static</Link>.
			</p>
		</section>
	</StandardPage>
)
