/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {broadcastActions} from 'localStore/actions'
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

class BroadcastView extends PureComponent {
  componentWillMount() {
    const query = this.getSearch();
    //只要id
    this.queryBroadcast(qs.stringify({
      id: query.id
    }));
  }

  getSearch = () => {
    const search = this.props.location.search;
    let query = {};
    if (search) {
      query = qs.parse(search.slice(1));
    }
    return query;
  };

  queryBroadcast = (queryString) => {
    const {broadcastActions} = this.props;
    broadcastActions.queryBroadcast(queryString);
  };

  renderState = (state) => {
    switch (state) {
      case 'U':
        return <span style={{color: '#40a9ff'}}>未启用</span>;
      case 'A':
        return <span style={{color: '#69d07a'}}>启用</span>;
      case 'X':
        return <span style={{color: '#ff4444'}}>禁用</span>;
      default:
        return <span>未设置</span>;
    }
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const {broadcast} = this.props;
    const {currentBroadcast} = broadcast;
    return (
      <div className="broadcast-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Button type="primary">编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <FormItem {...formItemLayout} label="id">
            <span>{currentBroadcast.id}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="uuid">
            <span>{currentBroadcast.uuid}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="创建时间">
            <span>{currentBroadcast.createDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="更新时间">
            <span>{currentBroadcast.updateDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="上线时间">
            <span>{currentBroadcast.startDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="下线时间">
            <span>{currentBroadcast.endDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            <span>
              {this.renderState(currentBroadcast.state)}
            </span>
          </FormItem>
          <FormItem {...formItemLayout} label="平台">
            <span>{currentBroadcast.platform}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="标题">
            <span>{currentBroadcast.title}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="url">
            <span>{currentBroadcast.url}</span>
          </FormItem>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    broadcast: state.broadcast
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  broadcastActions: bindActionCreators(broadcastActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadcastView));
