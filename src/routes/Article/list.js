/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Table, Button, Divider, Popconfirm} from 'antd';
import {Link} from 'react-router-dom'

class ArticleList extends PureComponent {
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
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '作者id',
        dataIndex: 'userId'
      },
      {
        title: '文章类型',
        dataIndex: 'articleType'
      },
      {
        title: '文章标签',
        dataIndex: 'articleTags'
      },
      {
        title: '点赞数',
        width: 80,
        dataIndex: 'likeCount'
      },
      {
        title: '评论数',
        width: 160,
        dataIndex: 'commentCount'
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
              <Link to={'/article/view?id=' + record.id} style={{margin: '0 .5em'}}>查看</Link>
              <Divider type="vertical"/>
              <Link to={'/article/edit?id=' + record.id}>编辑</Link>
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

export default ArticleList;
