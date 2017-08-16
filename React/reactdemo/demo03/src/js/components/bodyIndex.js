import React from 'react'
import BodyChild from './bodyChild'

class BodyIndex extends React.Component {
  constructor () {
    super() // 调用基类的所有的初始化方法
    this.state = {
      username: 'Parry',
      age: 23
    }
    this.changeUserInfo = this.changeUserInfo.bind(this)
    this.handleChildValueChange = this.handleChildValueChange.bind(this)
  }

  changeUserInfo () {
    this.setState({
      age: 50
    })
  }

  handleChildValueChange (event) {
    this.setState({age: event.target.value})
  }

  render () {

    return (
      <div>
        <h2>这里是主体内容</h2>
        <p>{this.state.username} {this.props.userid}</p>
        <p>age: {this.state.age}</p>
        <input type="button" value="提交" onClick={this.changeUserInfo}/>
        <BodyChild handleChildValueChange={this.handleChildValueChange}/>
      </div>
    )
  }
}

export default BodyIndex
