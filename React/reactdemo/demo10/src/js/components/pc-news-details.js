import React, {Component} from 'react'
import {
  Row,
  Col,
  BackTop
} from 'antd'
import PCHeader from './pc-header'
import PCFooter from './pc-footer'
import PCNewsImageBlock from './pc-news-image-block'
import CommonComments from './common-comments'

export default class PCNewsDetails extends Component {
  constructor () {
    super()
    this.state = {
      newsItme: ''
    }
  }

  componentDidMount () {
    const myFetchOptions = {
        method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
        this.setState({newsItem: json})
        document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台"
    })
  }

  createMarkup () {
    const html = this.state.newsItem ? this.state.newsItem.pagecontent : ''
	return {__html: html}
  }

  render () {
    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14} className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <hr/>
            <CommonComments uniquekey={this.props.params.uniquekey}></CommonComments>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock count={40} type="top" width="100%" cartTitle="相关新闻" imageWidth="140px"/>
          </Col>   
          <Col span={2}></Col>                 
        </Row>
        <PCFooter></PCFooter>
        <BackTop></BackTop>
      </div>
    )
  }
}
