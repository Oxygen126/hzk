import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import Main from './main/main'
import Chat from './chat/chat'
import Mine from './mine/mine'
import News from './news/news'
import { tabBarTemplateData } from './tabbardata.json'
import './home.css'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'main',
      hidden: false
    }
  }
  renderContent(selectKey) {
    // 判断变化的值->selectKey |
    const key = this.state.selectedTab
    switch (key) {
      case 'main':
        return <Main />
        break
      case 'news':
        return <News />
        break
      case 'chat':
        return <Chat />
        break
      case 'mine':
        return <Mine />
        break

      default:
        break
    }
  }
  render() {
    const tabBarTemplate = tabBarTemplateData.map((item, i) => {
      return (
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background: `${item.icon_bg_url}`
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background: `${item.selectedIcon_bg_url}`
              }}
            />
          }
          title={item.title}
          key={item.key}
          selected={this.state.selectedTab === item.selectedPath}
          onPress={() => {
            this.setState({
              selectedTab: `${item.selectedPath}`
            })
          }}
        >
          {this.renderContent(item.key)}
        </TabBar.Item>
      )
    })
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        {tabBarTemplate}
      </TabBar>
    )
  }
}
export default Home
