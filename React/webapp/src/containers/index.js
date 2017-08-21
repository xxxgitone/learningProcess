import React, { Component } from 'react'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStore.config'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      initDone: false
    }
  }

  componentDidMount () {
    let cityName = LocalStore.getItem(CITYNAME)
    if (cityName == null) {
      cityName = '北京'
    }
    this.setState({initDone: true})
  }

  render () {
    return (
      <div>
        {this.state.initDone ? this.props.children : <div>加载中...</div>}
      </div>
    )
  }
}
