import React from 'react'

class ComponentHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      miniHeader: false
    }
    this.switchHeader = this.switchHeader.bind(this)
  }

  switchHeader () {
    this.setState({
      miniHeader: !this.state.miniHeader
    })
  }

  render () {
    const styleComponentHeader = {
      header: {
        backgroundColor: "#333",
        color: "#fff",
        paddingTop: (this.state.miniHeader) ? "3px" : "15px",
        paddingBottom: (this.state.miniHeader) ? "3px" : "15px",
      }
    }

    return (
      <header style={styleComponentHeader.header} class="smallFontSize" onClick={this.switchHeader}>
        <h1>这里是头部</h1>
      </header>
    )
  }
}

export default ComponentHeader
