import App from './App.js'
import PostAPI from './ArticleAPI.js'

// components (custom web components)
import './components/va-app-header'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  const resultsEl = document.querySelector('#results')
  App.init(resultsEl)
})