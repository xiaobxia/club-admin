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
      '/systemMessage': '3',
      '/article': '4'
    };
    let currentPathName = this.props.location.pathname;
    currentPathName = '/' + currentPathName.split('/')[1];
    let openkeys = '';
    if (['/broadcast', '/systemMessage'].indexOf(currentPathName) !== -1) {
      openkeys = 'message';
    } else if (['/article'].indexOf(currentPathName) !== -1) {
      openkeys = 'article';
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
          <Menu.Item key="2"><Link to='/broadcast'>broadcast</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/systemMessage'>systemMessage</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="article" title={<span><Icon type="file-text"/><span>文章管理</span></span>}>
          <Menu.Item key="4"><Link to='/article'>article</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
