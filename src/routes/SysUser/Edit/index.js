/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Button, Form, Input, Select, DatePicker, Divider, message, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sysUserActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const {RangePicker} = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
};

class SysUserEdit extends PureComponent {
  state = {
    pageType: 'add',
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    if (query.id) {
      this.setState({pageType: 'edit', id: query.id});
      this.querySysUser(qs.stringify({
        id: query.id
      }));
    } else {
      this.props.sysUserActions.clearCurrentSysUser();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSearch = () => {
    const search = this.props.location.search;
    let query = {};
    if (search) {
      query = qs.parse(search.slice(1));
    }
    return query;
  };

  querySysUser = (queryString) => {
    const {sysUserActions} = this.props;
    sysUserActions.querySysUser(queryString);
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  getFormData = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    return data;
  };

  getEditorValue = () => {
    return this.editor.getValue();
  };

  saveHandler = () => {
    const {sysUserActions} = this.props;
    const data = this.getFormData();
    data.content = this.getEditorValue();
    data.userUuid = this.props.app.loginUser.userUuid;
    console.log(data)
    if (this.state.pageType === 'add') {
      sysUserActions.addSysUser(data).then((data) => {
        if (data.success) {
          message.success('添加成功');
          this.props.history.push('/sysUser');
        } else {
          message.error(data.msg);
        }
      });
    } else {
      data.id = this.state.id;
      sysUserActions.saveSysUser(data).then((data) => {
        if (data.success) {
          message.success('修改成功');
          this.props.history.push('/sysUser');
        } else {
          message.error(data.msg);
        }
      });
    }
  };

  render() {
    const {
      form: {
        getFieldDecorator
      },
      sysUser
    } = this.props;
    const {currentSysUser} = sysUser;
    return (
      <div className="sysUser-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Divider type="horizontal"/>
        <Form>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="用户名">
                {getFieldDecorator('userName', {
                  initialValue: currentSysUser.userName,
                  rules: [{required: true, message: '请输入用户名'}]
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="密码">
                {getFieldDecorator('password', {
                  initialValue: currentSysUser.password,
                  rules: [{required: true, message: '请输入密码'}]
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: currentSysUser.email,
                  rules: [{required: true, message: '请输入邮箱'}]
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('mobile', {
                  initialValue: currentSysUser.mobile,
                  rules: [{required: true, message: '请输入手机号'}]
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="激活">
                {getFieldDecorator('active', {
                  initialValue: currentSysUser.active || 'Y',
                  rules: [{required: true, message: '请输入标题'}]
                })(
                  <Select style={{width: 200}}>
                    <Option value="Y">激活</Option>
                    <Option value="N">未激活</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('state', {
                  initialValue: currentSysUser.state || 'Y',
                  rules: [{required: true, message: '请输入标题'}]
                })(
                  <Select style={{width: 200}}>
                    <Option value="Y">启用</Option>
                    <Option value="N">禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="强制登录">
                {getFieldDecorator('forceLogin', {
                  initialValue: currentSysUser.forceLogin || 'N',
                  rules: [{required: true, message: '请输入标题'}]
                })(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="是否锁定">
                {getFieldDecorator('isLocked', {
                  initialValue: currentSysUser.isLocked || 'N',
                  rules: [{required: true, message: '请输入标题'}]
                })(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={this.saveHandler}>保存</Button>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    sysUser: state.sysUser,
    app: state.app
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  sysUserActions: bindActionCreators(sysUserActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(SysUserEdit)));
