import React, {Component} from 'react'
import PCHeader from './pc-header'
import PCFooter from './pc-footer'

export default class PCIndex extends Component{
  render(){
    return (
      <div>
        <PCHeader></PCHeader>
        <PCFooter></PCFooter>
      </div>
    )
  }
}
