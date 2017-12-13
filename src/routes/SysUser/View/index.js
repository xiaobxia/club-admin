/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sysUserActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const FormItem = Form.Item;

const formItemLayout = {
  // labelCol: {
  //   xs: {span: 24},
  //   sm: {span: 8}
  // },
  // wrapperCol: {
  //   xs: {span: 24},
  //   sm: {span: 16}
  // }
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

  render() {
    const {sysUser} = this.props;
    const {currentSysUser} = sysUser;
    return (
      <div className="sysUser-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Button type="primary" onClick={this.goEditHandler}>编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <FormItem {...formItemLayout} label="id">
            <span>{currentSysUser.id}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="uuid">
            <span>{currentSysUser.uuid}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="创建时间">
            <span>{currentSysUser.createDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="更新时间">
            <span>{currentSysUser.updateDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="作者id">
            <span>{currentSysUser.userId}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章类型">
            <span>{currentSysUser.sysUserType}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章标签">
            <span>{currentSysUser.sysUserTags}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章标题">
            <span>{currentSysUser.title}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章点赞数">
            <span>{currentSysUser.likeCount}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章评论数">
            <span>{currentSysUser.commentCount}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章地址">
            <span>{currentSysUser.url}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章内容">
            <div
              className="sysUser-content-wrap"
              dangerouslySetInnerHTML={{__html: currentSysUser.content}}
            />
          </FormItem>
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
