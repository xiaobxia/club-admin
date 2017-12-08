/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {broadcastActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

class BroadcastEdit extends PureComponent {

  //生命周期mount
  componentDidMount() {
    console.log('BroadcastEdit mount');
  }

  componentWillMount() {
    const query = this.getSearch();
    query.pageIndex = query.pageIndex || 1;
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
    broadcastActions.queryBroadcastsCount();
  };

  render() {
    return (
      <div className="broadcast-wrap">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadcastEdit));
