import React, {Component} from 'react'
import {Row, Col} from 'antd'
import {
  Tabs,
  Carousel
} from 'antd'
import PCNewsBlock from './pc-news-block'
import PCNewsImageBlock from './pc-news-image-block'

const TabPane = Tabs.TabPane

export default class PCNewsContainer extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    }
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src="http://cms-bucket.nosdn.127.net/e1b3e95751c7427d8cbc845417e572a320170817190320.jpeg?imageView&thumbnail=600y250"/></div>
                  <div><img src="http://cms-bucket.nosdn.127.net/2d2063fbf3cb45f8ba649d2908bed73620170818012647.jpeg?imageView&thumbnail=600y250"/></div>
                  <div><img src="http://cms-bucket.nosdn.127.net/2f709b046d8642258e3cd513e442ef9b20170818000640.png?imageView&thumbnail=600y250"/></div>
                  <div><img src="http://cms-bucket.nosdn.127.net/3356a182d71e4b3e8db1a0e9f85443b120170818000234.jpeg?imageView&thumbnail=600y250"/></div>
                </Carousel>
              </div>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="false"></PCNewsBlock>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false"></PCNewsBlock>
              </TabPane>
            </Tabs>
            <div>
							<PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px"/>
						</div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
