/**
 * Created by xiaobxia on 2017/11/13.
 */
import React, {PureComponent} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {consoleRender} from 'localUtil/consoleLog'
import {authRoutes} from '../../router'

class AuthLayout extends PureComponent {
  componentDidMount() {
    console.log('AuthLayout mount');
  }

  render() {
    consoleRender('AuthLayout render');
    return (
      <div>
        <Switch>
          {authRoutes.map((item) => {
            return (<Route exact key={item.path} path={item.path} component={item.component}/>);
          })}
        </Switch>
      </div>
    );
  }
}

export default withRouter(AuthLayout);
