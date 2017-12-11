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
  }
];
