import React, { Component } from 'react';
import { Button, WhiteApace, WingBlank } from 'antd-mobile'
import AppRouter from './router'
import 'antd-mobile/dist/antd-mobile.css'  // or 'antd-mobile/dist/antd-mobile.less'
import './App.css';

class App extends Component {
  render() {
    return <AppRouter>
      <div>App</div>
    </AppRouter>


  }
}

export default App;
