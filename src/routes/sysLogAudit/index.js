/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sysLogAuditActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import SysLogAuditList from './list'

class SysLogAudit extends PureComponent {
  state = {
    redirectCount: 0
  };

  //生命周期mount
  componentDidMount() {
    console.log('SysLogAudit mount');
  }

  componentWillMount() {
    this.initPage();
  }

  initPage = () => {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.querySysLogAudits(qs.stringify(query));
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

  querySysLogAudits = (queryString) => {
    const {sysLogAuditActions} = this.props;
    sysLogAuditActions.querySysLogAudits(queryString).then((data) => {
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
          this.querySysLogAuditsWithUpdateQuery(qs.stringify(query));
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

  querySysLogAuditsWithUpdateQuery = (queryString) => {
    this.props.history.push('/sysLogAudit?' + queryString);
    this.querySysLogAudits(queryString);
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = this.getSearch();
    query.current = pagination.current;
    query.pageSize = pagination.pageSize;
    this.querySysLogAuditsWithUpdateQuery(qs.stringify(query));
    console.log(pagination)
  };

  render() {
    const {sysLogAudit} = this.props;
    const {pagination} = sysLogAudit;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: sysLogAudit.sysLogAuditList,
      onChange: this.tableChangeHandler
    };
    return (
      <div className="sysLogAudit-wrap">
        <SysLogAuditList {...listProps}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    sysLogAudit: state.sysLogAudit
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  sysLogAuditActions: bindActionCreators(sysLogAuditActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SysLogAudit));
