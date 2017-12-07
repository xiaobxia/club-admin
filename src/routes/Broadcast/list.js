/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Table, Button} from 'antd';

class BroadcastList extends PureComponent {
  render() {
    const columns = [
      {
        title: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: 'uuid',
        width: 300,
        dataIndex: 'uuid'
      },
      {
        title: '创建时间',
        width: 160,
        dataIndex: 'createDate'
      },
      {
        title: '更新时间',
        width: 160,
        dataIndex: 'updateDate'
      },
      {
        title: '上线时间',
        width: 160,
        dataIndex: 'startDate'
      },
      {
        title: '下线时间',
        width: 160,
        dataIndex: 'endDate'
      },
      {
        title: '状态',
        width: 80,
        render: (record) => {
          switch (record.state) {
            case 'U':
              return <span style={{color: '#40a9ff'}}>未启用</span>;
            case 'A':
              return <span style={{color: '#69d07a'}}>启用</span>;
            case 'X':
              return <span style={{color: '#ff4444'}}>禁用</span>;
            default:
              return <span>未设置</span>;
          }
        }
      },
      {
        title: '平台',
        width: 80,
        dataIndex: 'platform'
      },
      {
        title: '标题',
        width: 200,
        dataIndex: 'title'
      },
      {
        title: 'url',
        width: 200,
        dataIndex: 'url'
      },
      {
        title: '操作',
        width: 200,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <a href="" style={{margin: '0 .5em'}}>查看</a>
              <span>|</span>
              <a href="" style={{margin: '0 .5em'}}>编辑</a>
              <span>|</span>
              <a href="" style={{margin: '0 .5em'}}>删除</a>
            </div>
          );
        }
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

export default BroadcastList;
