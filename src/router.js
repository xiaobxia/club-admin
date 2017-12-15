import React from 'react'
import Bundle from './components/bundle'
import Login from 'Bundle-loader?lazy!localRoutes/Login'
import Dashboard from 'Bundle-loader?lazy!localRoutes/Dashboard'
import Broadcast from 'Bundle-loader?lazy!localRoutes/Broadcast'
import BroadcastEdit from 'Bundle-loader?lazy!localRoutes/Broadcast/Edit'
import BroadcastView from 'Bundle-loader?lazy!localRoutes/Broadcast/View'
import SystemMessage from 'Bundle-loader?lazy!localRoutes/SystemMessage'
import SystemMessageEdit from 'Bundle-loader?lazy!localRoutes/SystemMessage/Edit'
import SystemMessageView from 'Bundle-loader?lazy!localRoutes/SystemMessage/View'
import Article from 'Bundle-loader?lazy!localRoutes/Article'
import ArticleEdit from 'Bundle-loader?lazy!localRoutes/Article/Edit'
import ArticleView from 'Bundle-loader?lazy!localRoutes/Article/View'
import SysUser from 'Bundle-loader?lazy!localRoutes/SysUser'
import SysUserEdit from 'Bundle-loader?lazy!localRoutes/SysUser/Edit'
import SysUserView from 'Bundle-loader?lazy!localRoutes/SysUser/View'
import SysLogAudit from 'Bundle-loader?lazy!localRoutes/SysLogAudit'

//router4就得以这种方式懒加载
//其实model不需要按需加载，因为本来就不应该太大，应该由组件自己维护状态
let getComponent = (component) => {
  return (props) => {
    return (
      <Bundle load={component}>
        {(Container) => {
          return (<Container {...props}/>);
        }}
      </Bundle>
    );
  }
};
export const authRoutes = [
  {
    name: 'Login',
    path: '/user/login',
    component: getComponent(Login)
  }
];

export const baseRoutes = [
  {
    name: 'Dashboard Home',
    path: '/',
    component: getComponent(Dashboard)
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: getComponent(Dashboard)
  },
  {
    name: 'Broadcast',
    path: '/broadcast',
    component: getComponent(Broadcast)
  },
  {
    name: 'BroadcastEdit',
    path: '/broadcast/edit',
    component: getComponent(BroadcastEdit)
  },
  {
    name: 'BroadcastView',
    path: '/broadcast/view',
    component: getComponent(BroadcastView)
  },
  {
    name: 'SystemMessage',
    path: '/systemMessage',
    component: getComponent(SystemMessage)
  },
  {
    name: 'SystemMessageEdit',
    path: '/systemMessage/edit',
    component: getComponent(SystemMessageEdit)
  },
  {
    name: 'SystemMessageView',
    path: '/systemMessage/view',
    component: getComponent(SystemMessageView)
  },
  {
    name: 'Article',
    path: '/article',
    component: getComponent(Article)
  },
  {
    name: 'ArticleEdit',
    path: '/article/edit',
    component: getComponent(ArticleEdit)
  },
  {
    name: 'ArticleView',
    path: '/article/view',
    component: getComponent(ArticleView)
  },
  {
    name: 'SysUser',
    path: '/sysUser',
    component: getComponent(SysUser)
  },
  {
    name: 'SysUserEdit',
    path: '/sysUser/edit',
    component: getComponent(SysUserEdit)
  },
  {
    name: 'SysUserView',
    path: '/sysUser/view',
    component: getComponent(SysUserView)
  },
  {
    name: 'SysLogAudit',
    path: '/sysLogAudit',
    component: getComponent(SysLogAudit)
  }
];
