import React from 'react'

class BodyIndex extends React.Component {

  componentWillMount () {
    console.log('BodyIndex - componentWillMount')
  }

  // 加载完成
  componentDidMount () {
    console.log('BodyIndex - componentDidMount')
  }

  render () {

    const userName = 'parry'
    const boolInput = true

    return (
      <div>
        <h2>这里是主体内容</h2>
        <p>{userName === '' ? '用户未登录' : '用户名: ' + userName}</p>
        <p>
          <input type="button" value="默认按钮" disabled={boolInput}/>
        </p>
        {/*这里是注释*/}
      </div>
    )
  }
}

export default BodyIndex
