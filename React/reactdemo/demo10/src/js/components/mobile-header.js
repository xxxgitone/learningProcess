import React, {Component} from 'react'

export default class MobileHeader extends Component{
  render(){
    return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
        </header>
      </div>
    )
  }
}
