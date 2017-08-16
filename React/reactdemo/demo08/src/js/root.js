import React from 'react'
import ReactDOM from 'react-dom'
import Index from './index'
import ComponentList from './components/list'
import ComponentDetails from './components/details'
import {Router, Route, hashHistory} from 'react-router'

export default class Root extends React.Component{
  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}>
          <Route path="/details" component={ComponentDetails}></Route>
        </Route>
        <Route path="/list/:id" component={ComponentList}></Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
)
