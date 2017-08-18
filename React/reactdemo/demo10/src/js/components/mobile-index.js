import React, {Component} from 'react'
import MobileHeader from './mobile-header'
import MobileFooter from './mobile-footer'
import {
  Tabs,
  Carousel
} from 'antd'
import MobileList from './mobile-list'

const TabPane = Tabs.TabPane

export default class MobileIndex extends Component{
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
        <MobileHeader></MobileHeader>
        <Tabs>
          <TabPane tab="头条" key="1">
            <div className="carousel">
              <Carousel {...settings}>
                <div><img src="http://cms-bucket.nosdn.127.net/e1b3e95751c7427d8cbc845417e572a320170817190320.jpeg?imageView&thumbnail=600y250"/></div>
                <div><img src="http://cms-bucket.nosdn.127.net/2d2063fbf3cb45f8ba649d2908bed73620170818012647.jpeg?imageView&thumbnail=600y250"/></div>
                <div><img src="http://cms-bucket.nosdn.127.net/2f709b046d8642258e3cd513e442ef9b20170818000640.png?imageView&thumbnail=600y250"/></div>
                <div><img src="http://cms-bucket.nosdn.127.net/3356a182d71e4b3e8db1a0e9f85443b120170818000234.jpeg?imageView&thumbnail=600y250"/></div>
              </Carousel>
            </div>
            <MobileList count={20} type="top"></MobileList>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type="shehui"></MobileList>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList count={20} type="guonei"></MobileList>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type="guoji"></MobileList>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type="yule"></MobileList>
          </TabPane>         
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>
    )
  }
}
