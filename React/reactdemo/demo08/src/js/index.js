import React from 'react'
import ComponentHeader from './components/header'
import BodyIndex from './components/bodyIndex'
import ComponentFooter from './components/footer'

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <ComponentHeader />
        <BodyIndex userid={455}/>
        <div>
          {this.props.children}
        </div>
        <ComponentFooter/>
      </div>
    )
  }
}
