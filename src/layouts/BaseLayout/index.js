import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {Icon, Layout, notification} from 'antd';
import {injectIntl} from 'react-intl';
import AppMenu from './menu'
import AppHeader from './header'
import ModelLogin from './modelLogin'
const {Header, Content, Sider} = Layout;
import {appActions} from 'localStore/actions'
import {consoleRender} from 'localUtil/consoleLog'
import {baseRoutes} from '../../router'


class BaseLayout extends PureComponent {
  constructor() {
    super();
  }

  state = {
    menuProps: {}
  };

  toggleCollapsed = () => {
    this.props.appActions.appToggleCollapsed();
  };

  componentWillMount() {
    let locale = this.props.intl.formatMessage;
    const menuProps = {
      menus: [
        {
          path: '/dashboard',
          icon: 'desktop',
          name: locale({id: 'App.menu.dashboard'}),
          key: 1
        },
        {
          path: '/test',
          icon: 'pushpin',
          name: locale({id: 'App.menu.test'}),
          key: 2
        }
      ],
      menusMap: {
        '/': '1',
        '/home': '1',
        '/dashboard': '1',
        '/test': '2'
      }
    };
    this.setState({
      menuProps
    });
  }

  //生命周期mount
  componentDidMount() {
    if (this.props.app.loginUser.active === 'N') {
      notification.open({
        message: 'Notification Title',
        description: '请尽快去验证邮箱',
        icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>
      });
    }
  }

  //生命周期销毁前
  componentWillUnmount() {
  }

  render() {
    consoleRender('BaseLayout render');
    let props = this.props;
    let store = this.props.app;
    console.log(store.loginUser);
    let state = this.state;
    return (
      <div className="app-main">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            className="app-sider"
            collapsed={store.collapsed}
          >
            <AppMenu {...state.menuProps}/>
            <div className="trigger-wrap">
              <Icon
                className="trigger"
                type={store.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapsed}
              />
            </div>
          </Sider>
          {/*ant内部有classnames所以能直接用，原生的标签与要这个库*/}
          <Layout className={{'app-content': true, 'open': !store.collapsed}}>
            <Header className="app-header">
              <AppHeader
                userName={store.loginUser.userName}
                onLogout={props.appActions.appLogout}
              />
            </Header>
            <Content className="app-route-view">
              <Switch>
                {baseRoutes.map((item) => {
                  return (<Route exact key={item.path} path={item.path} component={item.component}/>);
                })}
              </Switch>
            </Content>
            <ModelLogin
              onLogin={props.appActions.appInsetLogin}
              onHide={props.appActions.appHideGlobLogin}
              visible={store.showGlobLogin}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
};
const mapDispatchToProps = dispatch => ({
  //action在此为引入
  appActions: bindActionCreators(appActions, dispatch)
});

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseLayout)));
