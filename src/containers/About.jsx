import React from 'react'
//
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';

export default () => (
	<StandardPage
		breadcrumbs={["about"]}
		keywords={["javascript", "application development", "computer science", "machine learning"]}>
		<h1>About</h1>
		<section>
			<h2>About Me</h2>
			<p>
				Hello there!
			</p>
			<p>
				My name's Michael though you will be able to find me as T0astBread (or T0ast for short) on the internet.
			</p>
			<p>
				I'm a student of IT and software engineering at an Austrian Higher Technical College and I'm very interested
				in the subject.
			</p>
			<p>
				My main interest right now is on application development (including both backend and frontend
				development as well as architecture design and tooling) but I'm trying to get a foothold in as many specializations
				as I can. Currently I also like database modelling, network/systems administration, machine learning and
				other kinds of computer science.
			</p>
			<p>
				You can check out what I'm working on on <Link to="https://github.com/T0astBread">my GitHub</Link> or, for a
				more concise overview, the <Link to="/repos">repos page</Link> on this site. Also take a look
				at <Link to="/shelf">my finished projects</Link>.
			</p>
		</section>
		<section>
			<h2>About this Site</h2>
			<p>
				This site mainly exists for me to showcase my projects and to have a publication platform that is not
				controlled by a third party. (Also, I just really wanted to make a website.)
			</p>
			<p>
				The site is written in JavaScript (JSX) using <Link to="https://react-static.js.org">React Static</Link>.
				It follows the principles of the <Link to="https://jamstack.org">JAMstack</Link> and is hosted
				on <Link to="https://netlify.com">Netlify</Link>.
			</p>
			<p>
				It is fully accessible without JavaScript on the client though it takes advantage of it when enabled
				by preloading directly linked pages and therefore cutting out loading time during navigation. All of this
				is managed by the wonderful React Static framework.
			</p>
			<p>
				Note that it's still in development, so it's a little rough around the edges.
				You can follow its progress and contribute on <Link to="https://github.com/t0astbread/t0ast.cc">GitHub</Link>.
			</p>
		</section>
	</StandardPage>
)
