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
  Modal,
  Card,
  notification
} from 'antd'

const FormItem = Form.Item
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const TabPane = Tabs.TabPane

class CommonComments extends Component{
  constructor () {
    super()
    this.state = {
      comments: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addUserCollection = this.addUserCollection.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault();
    const myFetchOptions = {
        method: 'GET'
    };
    const formdata = this.props.form.getFieldsValue()
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions)
    .then(response => response.json())
    .then(json => {    
      this.componentDidMount()
    })
  }

  addUserCollection() {
    const myFetchOptions = {
        method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
        //收藏成功以后进行一下全局的提醒
        notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
    })
  }

  componentDidMount () {
    const myFetchOptions = {
        method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
	  this.setState({comments: json})
	})
  }

  render () {
    const {getFieldProps} = this.props.form
    const {comments} = this.state;
    const commentList = comments.length
     ? comments.map((comment, index) => (
         <Card 
           key={index} 
           title={comment.UserName} 
           extra={<a href = "#" > 发布于 {comment.datetime} </a>}
         >
          <p>{comment.Comments}</p>
        </Card>
       ))
     : '没有加载到任何评论';
    return (
      <div className="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="您的评论">
                <Input type="textarea" placeholder="评论内容" {...getFieldProps('remark')}/>
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection}>收藏</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments)
