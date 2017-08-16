import React from 'react'

export default class ComponentList extends React.Component {
  render () {
    return (
      <div>列表页面,id {this.props.params.id}</div>
    )
  }
}
