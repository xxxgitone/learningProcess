import React, {Component} from 'react'
import {
  Row,
  Col,
  BackTop
} from 'antd'
import MobileHeader from './mobile-header'
import MobileFooter from './mobile-footer'

export default class MobileNewsDetails extends Component {
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
      <div id="mobileDetailsContainer">
        <div className="ucmobileList">
          <MobileHeader></MobileHeader>
          <Row>
            <Col span={24} className="container">
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            </Col>
          </Row>
          <MobileFooter></MobileFooter>
          <BackTop></BackTop>
        </div>
      </div>
    )
  }
}
