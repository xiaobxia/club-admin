/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {broadcastActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const FormItem = Form.Item;

class BroadcastView extends PureComponent {

  componentWillMount() {
    const query = this.getSearch();
    this.queryBroadcast(qs.stringify(query));
    console.log(query)
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
    broadcastActions.queryBroadcasts(queryString);
    broadcastActions.queryBroadcastsCount();
  };

  render() {
    return (
      <div className="broadcast-wrap">
        <Form>
          <FormItem label="id">
            <span></span>
          </FormItem>
          <FormItem label="uuid">
            <span></span>
          </FormItem>
          <FormItem label="创建时间">
            <span></span>
          </FormItem>
          <FormItem label="更新时间">
            <span></span>
          </FormItem>
          <FormItem label="上线时间">
            <span></span>
          </FormItem>
          <FormItem label="下线时间">
            <span></span>
          </FormItem>
          <FormItem label="状态">
            <span></span>
          </FormItem>
          <FormItem label="平台">
            <span></span>
          </FormItem>
          <FormItem label="标题">
            <span></span>
          </FormItem>
          <FormItem label="url">
            <span></span>
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
