import React, {PureComponent} from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import './scss/index.scss';
import AuthLayout from './layouts/AuthLayout'
import BaseLayout from './layouts/BaseLayout'
import PrivateRoute from 'localComponent/PrivateRoute'

/**
 * ***********国际化************
 **/
import {LocaleProvider} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
// 中文
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../locales/zh.json';
const appLocale = {
  messages: {
    ...zhMessages
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData
};
// 英文
// import antdEn from 'antd/lib/locale-provider/en_US';
// import appLocaleData from 'react-intl/locale-data/en';
// import enMessages from '../locales/en.json';
// const appLocale = {
//   messages: {
//     ...enMessages
//   },
//   antd: antdEn,
//   locale: 'en-US',
//   data: appLocaleData
// };

addLocaleData(appLocale.data);
console.log('app.js init');

//无状态组件
class App extends PureComponent {
  render() {
    console.log('App render');
    return (
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Router>
            <Switch>
              <Route path="/user" component={AuthLayout}/>
              <PrivateRoute path="/" component={BaseLayout}/>
            </Switch>
          </Router>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default App;

