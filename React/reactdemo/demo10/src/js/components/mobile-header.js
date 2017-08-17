import React, {Component} from 'react'
import {Link} from 'react-router'
import {Row, Col} from 'antd'
import { 
  Menu, 
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd'

const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const TabPane = Tabs.TabPane

class MobileHeader extends Component{
  constructor (props) {
    super(props)
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    }
    this.setModalVisible = this.setModalVisible.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.login = this.login.bind(this)
    this.callback = this.callback.bind(this)
  }

  setModalVisible (value) {
    this.setState({modalVisible: value})
  }

  handleClick (e) {
    if (e.key === 'register') {
      this.setState({current: 'register'})
      this.setModalVisible(true)
    } else {
      this.setState({current: e.key})
    }
  }

  login () {
    this.setModalVisible(true)
  }

  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	}

  handleSubmit (e) {
    e.preventDefault()
    const myFetchOptions = {
      method: 'GET'
    }
    const formData = this.props.form.getFieldsValue()
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId})
		})
		if (this.state.action=="login") {
			this.setState({hasLogined:true})
		}
		message.success("请求成功！")
		this.setModalVisible(false)
  }

  render(){
    const {getFieldProps} = this.props.form
    const userShow = this.state.hasLogined 
     ? <Link>
         <Icon type="inbox"/>
       </Link>
     : <Icon type="setting" onClick={this.login}/>
    return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal 
          title="用户中心" 
          wrapClassName="vertical-center-modal" 
          visible={this.state.modalVisible} 
          onCancel={() => this.setModalVisible(false)} 
          onOk={() => this.setModalVisible(false)} 
          okText="关闭"
        >
          <Tabs type="card">
            <TabPane tab="登录" key="1">
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')} />
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')} />
                </FormItem>
                <FormItem label="确认密码">
                  <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')} />
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)