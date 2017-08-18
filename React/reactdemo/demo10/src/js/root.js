import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import PCIndex from './components/pc-index'
import MobileIndex from './components/mobile-index'
import 'antd/dist/antd.css'
import MediaQuery from 'react-responsive'
import PCNewsDetails from './components/pc-news-details'
import MobileNewsDetails from './components/mobile-news-details'

export default class Root extends Component{
  render(){
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>            
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>            
          </Router>
        </MediaQuery>
      </div>
    )
  }
}

render(
  <Root/>,
  document.getElementById('root')
)
