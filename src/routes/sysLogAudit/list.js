/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Table, Button, Divider, Popconfirm} from 'antd';
import {Link} from 'react-router-dom'

class SysLogAuditList extends PureComponent {
  deleteHandler = (id) => {
    this.props.onDelete(id);
  };

  render() {
    const columns = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户Id',
        width: 80,
        dataIndex: 'userId'
      },
      {
        title: '登录类型',
        width: 80,
        dataIndex: 'logType'
      },
      {
        title: '平台',
        width: 80,
        dataIndex: 'platform'
      },
      {
        title: 'token',
        width: 160,
        dataIndex: 'token'
      },
      {
        title: '设备id',
        width: 160,
        dataIndex: 'deviceId'
      },
      {
        title: '创建时间',
        width: 160,
        dataIndex: 'createDate'
      }
    ];
    const {pagination, dataSource, onChange} = this.props;
    return (
      <Table
        pagination={pagination}
        dataSource={dataSource}
        onChange={onChange}
        bordered
        columns={columns}
        simple
        scroll={{x: 1800}}
        rowKey={record => record.id}
      />
    );
  }
}

export default SysLogAuditList;
