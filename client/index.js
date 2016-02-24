import { Router, Route, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    </Route>
  </Router>
  ,
  document.getElementById('root')
)
