/**
 * Created by xiaobxia on 2017/10/19.
 */
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import {consoleRender} from 'localUtil/consoleLog'
const AppMenu = (props) => {
  consoleRender('AppMenu render');
  let currentPathName = props.location.pathname;
  let menus = props.menus;
  let menusMap = props.menusMap;
  // NavLink不优雅
  // 不能用defaultSelectedKeys
  return (
    <Menu theme="dark" selectedKeys={[menusMap[currentPathName]]} mode="inline">
      {menus.map((item) => {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>
              <Icon type={item.icon}/>
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default withRouter(AppMenu);
