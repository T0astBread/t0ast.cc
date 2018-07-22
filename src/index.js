import React from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}

// Copy the _redirects file used to configure redirects on Netlify in the dist directory
const redirectsFile = fs.readFileSync("_redirects", {encoding: "utf-8"})
fs.writeFileSync("dist/_redirects", redirectsFile, {encoding: "utf-8"})
