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
      '/article': '4',
      '/sysUser': '5',
      '/userArchives': '6',
      '/sysLogAudit': '7'
    };
    let currentPathName = this.props.location.pathname;
    currentPathName = '/' + currentPathName.split('/')[1];
    let openkeys = '';
    if (['/broadcast', '/systemMessage'].indexOf(currentPathName) !== -1) {
      openkeys = 'message';
    } else if (['/article'].indexOf(currentPathName) !== -1) {
      openkeys = 'article';
    } else if (['/sysUser', '/userArchives'].indexOf(currentPathName) !== -1) {
      openkeys = 'account';
    } else if (['/sysLogAudit'].indexOf(currentPathName) !== -1) {
      openkeys = 'record';
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
        <SubMenu key="account" title={<span><Icon type="user"/><span>用户管理</span></span>}>
          <Menu.Item key="5"><Link to='/sysUser'>sysUser</Link></Menu.Item>
          <Menu.Item key="6"><Link to='/userArchives'>userArchives</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="record" title={<span><Icon type="user"/><span>记录管理</span></span>}>
          <Menu.Item key="7"><Link to='/sysLogAudit'>登录日志</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
