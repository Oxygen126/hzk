import React, { Component } from 'react'
import { SearchBar, Carousel, Grid, NoticeBar, Card, Badge } from 'antd-mobile'
import axios from '../../http'
const badgeStyleObj = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736',
}
const thumbStyleObj = {
  width: '125px',
  height: '95px'
}
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipeData: [],
      menuData: [],
      infoData: [],
      faqData: [],
      houseData: [],
      houseDataChanged: [],
      data: Array.from(new Array(8)).map((_val, i) => ({
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`
      })),
      imgHeight: 176
    }
  }

  getMainData = async (path) => {
    const {
      data,
      meta: { msg, status }
    } = await axios.post(path)
    console.log(msg, status)
    if (status === 200) {
      return data.list
    }
  }
  async componentDidMount() {
    // this.autoFocusInst.focus()
    const swipeData = this.getMainData(`homes/swipe`)
    const menuData = this.getMainData(`homes/menu`)
    const infoData = this.getMainData(`homes/info`)
    const faqData = this.getMainData(`homes/faq`)
    const houseData = this.getMainData(`homes/house`)
    const mainData = await Promise.all([
      swipeData,
      menuData,
      infoData,
      faqData,
      houseData
    ])
    // console.log(mainData)
    this.setState({
      swipeData: mainData[0],
      menuData: mainData[1],
      infoData: mainData[2],
      faqData: mainData[3],
      houseData: mainData[4],
    }, () => {
      // console.log(this.state.houseData)
      // let temp = [...this.state.data]
      let temp = this.state.menuData.map((item, i) => {
        return {
          id: item.id,
          icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
          text: item.menu_name
        }
      })
      // let arr = this.changeHouseData(this.state.houseData, 2, 2, 3)
      // console.log(arr)
      let houseDataChanged = this.changeHouseData(
        this.state.houseData,
        2,
        2,
        3
      )
      console.log(houseDataChanged)

      this.setState({
        data: temp,
        houseDataChanged
      })
    })
  }

  changeHouseData = (arr, ...rest) => {
    let arrres = []
    for (let index = 0; index < rest.length; index++) {
      const temp = arr.splice(0, rest[index])
      arrres.push(temp)
    }
    return arrres
  }

  render() {
    const carouselTemplate = this.state.swipeData.map((val, i) => (
      <a
        key={i}
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={val.original}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
    const infoTemplate = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar
          marqueeProps={{ loop: true, style: { padding: '0 16px' } }}
          key={item.id}
          mode="link"
          action={<span>去看看</span>}
        >
          {item.info_title}
        </NoticeBar>
      )
    })

    let faqTemplate = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
          />
          <Card.Body>
            <div>
              <Badge text={item.question_tag}
                style={badgeStyleObj}
              />
              <Badge text={item.answer_content}
                style={badgeStyleObj}
              />
              <Badge text={item.atime}
                style={badgeStyleObj}
              />
              <Badge text={item.qnum}
                style={badgeStyleObj}
              />
            </div>
          </Card.Body>
        </Card>
      )
    })
    faqTemplate = [<b key="faqtitle">好客资讯</b>, ...faqTemplate]

    const houseTemplate = this.state.houseDataChanged.map((item1, i) => {
      // 三次循环
      const houseItemTemplate = item1.map((item2, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyleObj}
              extra={
                <div>
                  <Badge text={item2.home_name} style={badgeStyleObj} />
                  <Badge text={item2.home_desc} style={badgeStyleObj} />
                  <Badge text={item2.home_tags} style={badgeStyleObj} />
                  <Badge text={item2.home_price} style={badgeStyleObj} />
                </div>
              }
            />
          </Card>
        )
      })
      const titles = ['最新开盘', '二手精选', '组个家']
      return (
        <div key={i}>
          <b>{titles[i]}</b>
          {houseItemTemplate}
        </div>
      )
    })


    return <div>
      {/* 搜索框 */}
      <SearchBar
        placeholder="请输入搜索内容"
        ref={ref => this.autoFocusInst = ref}
      />
      {/* 轮播图 */}
      <Carousel
        autoplay={true}
        infinite
      >
        {carouselTemplate}
      </Carousel>
      {/* 菜单 */}
      <Grid data={this.state.data} activeStyle={false} />
      {/* 通告栏 */}
      {infoTemplate}
      {/* <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
      </NoticeBar> */}
      {/* 好客问答 */}
      {faqTemplate}
      {/* 房屋列表 */}
      {houseTemplate}
      <div style={{ height: '50px' }}></div>
    </div>
  }
}
export default Main

/**
 *  const {
      data,
      meta: { msg, status }
    } = await axios.post(`homes/swipe`)
    if (status === 200) {
      this.setState({
        swipeData: data.list
      })
    }
    {
      const {
        data,
        meta: { msg, status }
      } = await axios.post(`homes/menu`)
      console.log(data)
    }
 */
