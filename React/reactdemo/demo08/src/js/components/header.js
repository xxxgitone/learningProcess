import React from 'react'
import {Link} from 'react-router'

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
      <header style={styleComponentHeader.header} class="smallFontSize">
        <h1>这里是头部</h1>
        <ul>
          <li><Link to={`/`}>首页</Link></li>
          <li><Link to={`/details`}>详情</Link></li>
          <li><Link to={`/list/1234`}>列表</Link></li>          
        </ul>
      </header>
    )
  }
}

export default ComponentHeader
