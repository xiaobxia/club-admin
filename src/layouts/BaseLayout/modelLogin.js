/**
 * Created by xiaobxia on 2017/10/23.
 */
import React, {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'
import {injectIntl} from 'react-intl'
import {Modal, Button, Form, Input, Icon} from 'antd';
import {consoleRender} from 'localUtil/consoleLog'
const FormItem = Form.Item;

class ModelLogin extends PureComponent {
  state = {
    confirmLoading: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    nextState = nextState || {};
    nextProps = nextProps || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key]) {
        return true;
      }
    }

    for (const key in nextState) {
      if (thisState[key] !== nextState[key]) {
        return true;
      }
    }
    return false;
  }

  handleOk = () => {
    const {
      form: {
        getFieldsValue
      },
      onLogin
    } = this.props;
    this.setState({
      confirmLoading: true
    });
    onLogin(getFieldsValue()).then(() => {
      this.setState({
        confirmLoading: false
      });
      this.props.onHide();
    });
  };
  //取消登录就跳出系统
  handleCancel = () => {
    this.props.onHide();
  };

  render() {
    consoleRender('ModelLogin render');
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;
    let locale = this.props.intl.formatMessage;
    const {confirmLoading} = this.state;
    const {visible} = this.props;
    return (
      <div>
        <Modal title={locale({id: 'App.login'})}
               visible={visible}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
        >
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('user', {
                rules: [{required: true, message: 'Please input your username!'}]
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}]
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(injectIntl(withRouter(ModelLogin)));
