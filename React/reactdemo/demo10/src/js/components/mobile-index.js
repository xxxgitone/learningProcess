import React, {Component} from 'react'
import MobileHeader from './mobile-header'
import MobileFooter from './mobile-footer'

export default class MobileIndex extends Component{
  render(){
    return (
      <div>
        <MobileHeader></MobileHeader>
        <MobileFooter></MobileFooter>
      </div>
    )
  }
}
