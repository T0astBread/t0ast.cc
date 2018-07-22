import React from 'react'
import ReactDOM from 'react-dom'

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

// Check if the fs module is available (it should be during build but not when you run react-static start)
let fs
try {
  fs = require("fs")
}
catch(err) {
  console.warn("fs module not found - not copying _redirects file")
}
if(fs) { // Copy the _redirects file used to configure redirects on Netlify into the dist directory
  const redirectsFile = fs.readFileSync("_redirects", {encoding: "utf-8"})
  fs.writeFileSync("dist/_redirects", redirectsFile, {encoding: "utf-8"})
}
