import React, { Component } from 'react'
import { Flex, NavBar, Button, WingBlank, List, InputItem, Toast } from 'antd-mobile'
import './login.css'
import axios from '../http'
import 'antd-mobile/dist/antd-mobile.css'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }
  changeInputValue = (key, val) => {
    // console.log(key, val)
    this.setState({
      [key]: val
    })
  }
  handleLogin = async () => {
    const {
      data,
      meta: { status, msg }
    } = await axios.post(`/users/login`, {
      uname: this.state.uname,
      pwd: this.state.pwd
    })
    console.log(data, status)
    if (status === 200) {
      localStorage.setItem('token', data.token)
      const { history } = this.props
      history.push('/')
    } else {
      Toast.fail(msg, 3)
    }
  }
  render() {
    return (
      <div>
        <WingBlank size="sm">
          <Flex direction={'column'} justify={'center'}>
            <Flex.Item>
              <NavBar>登录</NavBar>
            </Flex.Item>
            <Flex.Item>
              <List>
                <InputItem value={this.state.uname}
                  onChange={(val) => {
                    this.changeInputValue('uname', val)
                  }}>姓名</InputItem>
                <InputItem value={this.state.pwd}
                  onChange={(val) => {
                    this.changeInputValue('pwd', val)
                  }}>密码</InputItem>
              </List>
              <Button type="primary" onClick={this.handleLogin}>登录</Button>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
export default Login
