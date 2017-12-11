/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {systemMessageActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import SystemMessageList from './list'
import SystemMessageHeader from './header'

class SystemMessage extends PureComponent {
  state = {
    redirectCount: 0
  };

  //生命周期mount
  componentDidMount() {
    console.log('SystemMessage mount');
  }

  componentWillMount() {
    this.initPage();
  }

  initPage = () => {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.querySystemMessages(qs.stringify(query));
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

  querySystemMessages = (queryString) => {
    const {systemMessageActions} = this.props;
    systemMessageActions.querySystemMessages(queryString).then((data) => {
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
          this.querySystemMessagesWithUpdateQuery(qs.stringify(query));
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

  querySystemMessagesWithUpdateQuery = (queryString) => {
    this.props.history.push('/systemMessage?' + queryString);
    this.querySystemMessages(queryString);
  };

  searchHandler = (filter) => {
    filter.current = 1;
    filter.pageSize = 10;
    console.log(filter);
    this.querySystemMessagesWithUpdateQuery(qs.stringify(filter));
  };

  toAddHandler = () => {
    this.props.history.push('/systemMessage/edit');
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = this.getSearch();
    query.current = pagination.current;
    query.pageSize = pagination.pageSize;
    this.querySystemMessagesWithUpdateQuery(qs.stringify(query));
    console.log(pagination)
  };

  tableDeleteHandler = (id) => {
    const {systemMessageActions} = this.props;
    systemMessageActions.deleteSystemMessage(id).then(() => {
      this.initPage();
    });
  };

  tableUpdateHandler = () => {
    const {systemMessageActions} = this.props;
    systemMessageActions.updateSystemMessages().then(() => {
      message.success('更新成功');
      this.initPage();
    });
  };

  render() {
    const {systemMessage} = this.props;
    const {pagination} = systemMessage;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: systemMessage.systemMessageList,
      onChange: this.tableChangeHandler,
      onDelete: this.tableDeleteHandler
    };
    const headerProps = {
      onUpdate: this.tableUpdateHandler,
      onSearch: this.searchHandler,
      onAdd: this.toAddHandler
    };
    return (
      <div className="systemMessage-wrap">
        <SystemMessageHeader {...headerProps}/>
        <SystemMessageList {...listProps}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    systemMessage: state.systemMessage
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  systemMessageActions: bindActionCreators(systemMessageActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SystemMessage));
