import React from 'react'
//
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default () => (
	<StandardPage breadcrumbs={["about"]}>
		<h1>About</h1>
		<section>
			<h2>About Me</h2>
			<p>Err, no I don't wanna write that right now.</p>
		</section>
		<section>
			<h2>About this Site</h2>
			<p>
				This site is written in JavaScript (JSX) using <Link to="https://react-static.js.org">React Static</Link>.
				It follows the principles fo the <Link to="https://jamstack.org">JAMstack</Link> and is hosted on <Link to="https://netlify.com">Netlify</Link>.
			</p>
			<p>
				Note that it's still in development, so it's a little rough around the edges.
				You can follow its progress and contribute on <Link to="https://github.com/t0astbread/t0ast.cc">GitHub</Link>.
			</p>
		</section>
	</StandardPage>
)
