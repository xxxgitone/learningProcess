import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import PCIndex from './components/pc-index'
import MobileIndex from './components/mobile-index'
import 'antd/dist/antd.css'
import MediaQuery from 'react-responsive'

export default class Root extends Component{
  render(){
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <PCIndex/>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <MobileIndex/>
        </MediaQuery>
      </div>
    )
  }
}

render(
  <Root/>,
  document.getElementById('root')
)
