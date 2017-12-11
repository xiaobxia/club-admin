/**
 * Created by xiaobxia on 2017/10/19.
 */
import React, {PureComponent} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import {consoleRender} from 'localUtil/consoleLog'

const SubMenu = Menu.SubMenu;

class AppMenu extends PureComponent {
  render() {
    const menusMap = {
      '/': '1',
      '/home': '1',
      '/dashboard': '1',
      '/broadcast': '2',
      '/systemMessage': '3'
    };
    let currentPathName = this.props.location.pathname;
    let openkeys = '';
    if (['/broadcast', '/systemMessage'].indexOf(currentPathName) !== -1) {
      openkeys = 'message';
    }
    return (
      <Menu
        theme="dark"
        inlineCollapsed={this.props.collapsed}
        defaultOpenKeys={[openkeys]}
        selectedKeys={[menusMap[currentPathName]]}
        mode="inline"
      >
        <SubMenu key="message" title={<span><Icon type="mail"/><span>消息管理</span></span>}>
          <Menu.Item key="1"><Link to='/broadcast'>broadcast</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/systemMessage'>systemMessage</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
