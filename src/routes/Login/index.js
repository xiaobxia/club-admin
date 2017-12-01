/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {PureComponent} from 'react'
import {Card, Alert} from 'antd';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {injectIntl} from 'react-intl';
import {consoleRender} from 'localUtil/consoleLog'
import LoginForm from './form'
import {appActions} from 'localStore/actions'

class Login extends PureComponent {
  state = {
    showError: false,
    errorMsg: ''
  };

  onClose = () => {
    this.setState({
      showError: false,
      errorMsg: ''
    });
  };

  loginHandler = (formData) => {
    const {appActions} = this.props;
    appActions.appLogin(formData).then((data) => {
      if (data.login === false && data.msg) {
        this.setState({
          showError: true,
          errorMsg: data.msg
        });
      } else {
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    consoleRender('Login render');
    // 渲染多次的原因是，自动填充了两次
    const locale = this.props.intl.formatMessage;
    return (
      <div className="login-wrap">
        <div className="logo">{locale({id: 'App.name'})}</div>
        {this.state.showError && (<Alert message={this.state.errorMsg} type="error" closable onClose={this.onClose}/>)}
        <Card noHovering={true}>
          <LoginForm onLoginHandler={this.loginHandler}>
            <Link to="/user/forgot">忘记密码</Link>
          </LoginForm>
          <Link to="/user/register">去注册</Link>
        </Card>
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

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));
