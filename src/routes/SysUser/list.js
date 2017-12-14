/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Table, Button, Divider, Popconfirm} from 'antd';
import {Link} from 'react-router-dom'

class SysUserList extends PureComponent {
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
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '激活',
        render: (record) => {
          switch (record.active) {
            case 'Y':
              return <span style={{color: '#69d07a'}}>已激活</span>;
            case 'N':
              return <span style={{color: '#ff4444'}}>未激活</span>;
            default:
              return <span>未设置</span>;
          }
        }
      },
      {
        title: '状态',
        render: (record) => {
          switch (record.state) {
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
        title: '锁定',
        render: (record) => {
          switch (record.isLocked) {
            case 'Y':
              return <span style={{color: '#ff4444'}}>已锁定</span>;
            case 'N':
              return <span style={{color: '#69d07a'}}>未锁定</span>;
            default:
              return <span>未设置</span>;
          }
        }
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
        title: '操作',
        width: 180,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <Link to={'/sysUser/view?id=' + record.id} style={{margin: '0 .5em'}}>查看</Link>
              <Divider type="vertical"/>
              <Link to={'/sysUser/edit?id=' + record.id}>编辑</Link>
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

export default SysUserList;
