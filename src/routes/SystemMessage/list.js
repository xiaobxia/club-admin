/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Table, Button, Divider, Popconfirm} from 'antd';
import {Link} from 'react-router-dom'

class SystemMessageList extends PureComponent {
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
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '发送时间',
        width: 160,
        dataIndex: 'startDate'
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
        title: 'url',
        dataIndex: 'url'
      },
      {
        title: '操作',
        width: 180,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <Link to={'/systemMessage/view?id=' + record.id} style={{margin: '0 .5em'}}>查看</Link>
              <Divider type="vertical"/>
              <Link to={'/systemMessage/edit?id=' + record.id}>编辑</Link>
              <Divider type="vertical"/>
              <Popconfirm
                title="确认删除此记录?"
                onConfirm={() => {
                  this.deleteHandler(record.id)
                }}
                okText="确定"
                cancelText="取消"
              >
                <a href="#">删除</a>
              </Popconfirm>
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

export default SystemMessageList;
