import React from 'react'
import Bundle from './components/bundle'
import Login from 'Bundle-loader?lazy!localRoutes/Login'
import Register from 'Bundle-loader?lazy!localRoutes/Register'
import RegisterResult from 'Bundle-loader?lazy!localRoutes/RegisterResult'
import UserActive from 'Bundle-loader?lazy!localRoutes/Active'
import Dashboard from 'Bundle-loader?lazy!localRoutes/Dashboard'
import Test from 'Bundle-loader?lazy!localRoutes/Test'

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
  },
  {
    name: 'Register',
    path: '/user/register',
    component: getComponent(Register)
  },
  {
    name: 'RegisterResult',
    path: '/user/registerResult',
    component: getComponent(RegisterResult)
  },
  {
    name: 'UserActive',
    path: '/user/active',
    component: getComponent(UserActive)
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
    name: 'Test',
    path: '/test',
    component: getComponent(Test)
  }
];
