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
  state = {
    redirectCount: 0
  };

  //生命周期mount
  componentDidMount() {
    console.log('Broadcast mount');
  }

  componentWillMount() {
    this.initPage();
  }

  initPage = () => {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.queryBroadcasts(qs.stringify(query));
    console.log(query)
  };

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
    broadcastActions.queryBroadcasts(queryString).then((data) => {
      //无数据
      if (data.list.length === 0) {
        const query = this.getSearch();
        const current = parseInt(query.current, 10);
        if (current && current > 1) {
          if (this.state.redirectCount > 1) {
            this.props.history.push('/404');
          }
          this.setState((pre) => {
            return {
              redirectCount: pre.redirectCount + 1
            }
          });
          query.current = current - 1;
          this.queryBroadcastsWithUpdateQuery(qs.stringify(query));
        }
      } else {
        this.setState((pre) => {
          return {
            redirectCount: 0
          }
        });
      }
    });
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

  tableDeleteHandler = (id) => {
    const {broadcastActions} = this.props;
    broadcastActions.deleteBroadcast(id).then(() => {
      this.initPage();
    });
  };

  render() {
    const {broadcast} = this.props;
    const {pagination} = broadcast;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: broadcast.broadcastList,
      onChange: this.tableChangeHandler,
      onDelete: this.tableDeleteHandler
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
