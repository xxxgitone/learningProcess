import React from 'react'

class BodyIndex extends React.Component {
  constructor () {
    super() // 调用基类的所有的初始化方法
    this.state = {username: 'Parry'}
  }

  render () {

    setTimeout(() => {
      this.setState({username: 'Jiang'})
    }, 4000)

    return (
      <div>
        <h2>这里是主体内容</h2>
        <p>{this.state.username} {this.props.userid}</p>
      </div>
    )
  }
}

export default BodyIndex
