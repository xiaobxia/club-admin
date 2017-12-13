/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sysUserActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import SysUserList from './list'
import SysUserHeader from './header'

class SysUser extends PureComponent {
  state = {
    redirectCount: 0
  };

  //生命周期mount
  componentDidMount() {
    console.log('SysUser mount');
  }

  componentWillMount() {
    this.initPage();
  }

  initPage = () => {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.querySysUsers(qs.stringify(query));
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

  querySysUsers = (queryString) => {
    const {sysUserActions} = this.props;
    sysUserActions.querySysUsers(queryString).then((data) => {
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
          this.querySysUsersWithUpdateQuery(qs.stringify(query));
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

  querySysUsersWithUpdateQuery = (queryString) => {
    this.props.history.push('/sysUser?' + queryString);
    this.querySysUsers(queryString);
  };

  searchHandler = (filter) => {
    filter.current = 1;
    filter.pageSize = 10;
    console.log(filter);
    this.querySysUsersWithUpdateQuery(qs.stringify(filter));
  };

  toAddHandler = () => {
    this.props.history.push('/sysUser/edit');
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = this.getSearch();
    query.current = pagination.current;
    query.pageSize = pagination.pageSize;
    this.querySysUsersWithUpdateQuery(qs.stringify(query));
    console.log(pagination)
  };

  tableDeleteHandler = (id) => {
    const {sysUserActions} = this.props;
    sysUserActions.deleteSysUser(id).then(() => {
      this.initPage();
    });
  };

  render() {
    const {sysUser} = this.props;
    const {pagination} = sysUser;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: sysUser.sysUserList,
      onChange: this.tableChangeHandler,
      onDelete: this.tableDeleteHandler
    };
    const headerProps = {
      onSearch: this.searchHandler,
      onAdd: this.toAddHandler
    };
    return (
      <div className="sysUser-wrap">
        <SysUserHeader {...headerProps}/>
        <SysUserList {...listProps}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SysUser));
