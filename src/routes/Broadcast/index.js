/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {broadcastActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import BroadcastList from './list'
import BroadcastHeader from './header'

class Broadcast extends PureComponent {

  //生命周期mount
  componentDidMount() {
    console.log('Broadcast mount');
  }

  componentWillMount() {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.queryBroadcasts(qs.stringify(query));
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

  queryBroadcasts = (queryString) => {
    const {broadcastActions} = this.props;
    broadcastActions.queryBroadcasts(queryString);
  };

  queryBroadcastsWithUpdateQuery = (queryString) => {
    this.props.history.push('/broadcast?' + queryString);
    this.queryBroadcasts(queryString);
  };

  searchHandler = (filter) => {
    filter.current = 1;
    filter.pageSize = 10;
    console.log(filter);
    this.queryBroadcastsWithUpdateQuery(qs.stringify(filter));
  };

  toAddHandler = () => {
    this.props.history.push('/broadcast/edit');
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = this.getSearch();
    query.current = pagination.current;
    query.pageSize = pagination.pageSize;
    this.queryBroadcastsWithUpdateQuery(qs.stringify(query));
    console.log(pagination)
  };

  render() {
    const {broadcast} = this.props;
    const {pagination} = broadcast;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: broadcast.broadcastList,
      onChange: this.tableChangeHandler
    };
    return (
      <div className="broadcast-wrap">
        <BroadcastHeader onSearch={this.searchHandler} onAdd={this.toAddHandler}/>
        <BroadcastList {...listProps}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Broadcast));
