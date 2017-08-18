import React, {Component} from 'react'
import PCHeader from './pc-header'
import PCFooter from './pc-footer'
import PCNewsContainer from './pc-newscontainer'

export default class PCIndex extends Component{
  render(){
    return (
      <div>
        <PCHeader></PCHeader>
        <PCNewsContainer></PCNewsContainer>
        <PCFooter></PCFooter>
      </div>
    )
  }
}
