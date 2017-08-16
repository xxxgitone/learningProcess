import React from 'react'
import PropTypes from 'prop-types'
import BodyChild from './bodyChild'

import ReactMixin from 'react-mixin'
import MixinLog from './minixs'

const defaultProps = {
  username: '默认用户名'
}

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

    // refs
    console.log(this.submitButton)
    this.submitButton.style.color = 'red'

    // mixin
    MixinLog.log()
  }

  handleChildValueChange (event) {
    this.setState({age: event.target.value})
  }

  render () {

    return (
      <div>
        <h2>这里是主体内容</h2>
        <p>接收到的父页面的属性，userid: {this.props.userid} username: {this.props.username}</p>
        <p>usernmae: {this.state.username}</p>
        <p>age: {this.state.age}</p>
        <input type="button" value="提交" onClick={this.changeUserInfo} ref={input => this.submitButton = input}/>
        <BodyChild handleChildValueChange={this.handleChildValueChange} {...this.props}/>
        {/* ...this.props将props全部传给子页面*/}
      </div>
    )
  }
}

BodyIndex.propTypes = {
  userid: PropTypes.number.isRequired
}

// 默认属性值
BodyIndex.defaultProps = defaultProps

// mixin
ReactMixin(BodyIndex.prototype, MixinLog)

export default BodyIndex
