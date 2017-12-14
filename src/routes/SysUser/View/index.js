/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sysUserActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

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

class SysUserView extends PureComponent {
  state = {
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    this.querySysUser(qs.stringify({
      id: query.id
    }));
    this.setState({
      id: query.id
    });
  }

  componentDidMount() {
    this.props.history
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

  goEditHandler = () => {
    this.props.history.push('/sysUser/edit?id=' + this.state.id);
  };

  renderActive = (active) => {
    switch (active) {
      case 'Y':
        return <span style={{color: '#69d07a'}}>已激活</span>;
      case 'N':
        return <span style={{color: '#ff4444'}}>未激活</span>;
      default:
        return <span>未设置</span>;
    }
  };

  renderState = (state) => {
    switch (state) {
      case 'A':
        return <span style={{color: '#69d07a'}}>启用</span>;
      case 'X':
        return <span style={{color: '#ff4444'}}>禁用</span>;
      default:
        return <span>未设置</span>;
    }
  };

  renderIsLocked = (isLocked) => {
    switch (isLocked) {
      case 'Y':
        return <span style={{color: '#ff4444'}}>已锁定</span>;
      case 'N':
        return <span style={{color: '#69d07a'}}>未锁定</span>;
      default:
        return <span>未设置</span>;
    }
  };

  renderForceLogin = (forceLogin) => {
    switch (forceLogin) {
      case 'Y':
        return <span style={{color: '#ff4444'}}>是</span>;
      case 'N':
        return <span style={{color: '#69d07a'}}>否</span>;
      default:
        return <span>未设置</span>;
    }
  };

  render() {
    const {sysUser} = this.props;
    const {currentSysUser} = sysUser;
    return (
      <div className="sysUser-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Button type="primary" style={{marginLeft: 8}} onClick={this.goEditHandler}>编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="id">
                <span>{currentSysUser.id}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="uuid">
                <span>{currentSysUser.uuid}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="用户名">
                <span>{currentSysUser.userName}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="密码">
                <span>{currentSysUser.password}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="邮箱">
                <span>{currentSysUser.email}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="激活">
                <span>{this.renderActive(currentSysUser.active)}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="激活日期">
                <span>{currentSysUser.activeDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="状态">
                <span>{this.renderState(currentSysUser.state)}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="状态修改日期">
                <span>{currentSysUser.stateDate}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="锁定">
                <span>{this.renderIsLocked(currentSysUser.isLocked)}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="强制登录">
                <span>{this.renderForceLogin(currentSysUser.forceLogin)}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="登录失败次数">
                <span>{currentSysUser.loginFail}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="解锁日期">
                <span>{currentSysUser.unlockDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="创建日期">
                <span>{currentSysUser.createDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="修改日期">
                <span>{currentSysUser.updateDate}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    sysUser: state.sysUser
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  sysUserActions: bindActionCreators(sysUserActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SysUserView));
