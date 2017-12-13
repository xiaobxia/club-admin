/**
 * Created by xiaobxia on 2017/12/7.
 */
import React, {PureComponent} from 'react'
import {Breadcrumb, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {articleActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import ArticleList from './list'
import ArticleHeader from './header'

class Article extends PureComponent {
  state = {
    redirectCount: 0
  };

  //生命周期mount
  componentDidMount() {
    console.log('Article mount');
  }

  componentWillMount() {
    this.initPage();
  }

  initPage = () => {
    const query = this.getSearch();
    //初始化页面
    query.current = query.current || 1;
    query.pageSize = query.pageSize || 10;
    this.queryArticles(qs.stringify(query));
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

  queryArticles = (queryString) => {
    const {articleActions} = this.props;
    articleActions.queryArticles(queryString).then((data) => {
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
          this.queryArticlesWithUpdateQuery(qs.stringify(query));
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

  queryArticlesWithUpdateQuery = (queryString) => {
    this.props.history.push('/article?' + queryString);
    this.queryArticles(queryString);
  };

  searchHandler = (filter) => {
    filter.current = 1;
    filter.pageSize = 10;
    console.log(filter);
    this.queryArticlesWithUpdateQuery(qs.stringify(filter));
  };

  toAddHandler = () => {
    this.props.history.push('/article/edit');
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = this.getSearch();
    query.current = pagination.current;
    query.pageSize = pagination.pageSize;
    this.queryArticlesWithUpdateQuery(qs.stringify(query));
    console.log(pagination)
  };

  tableDeleteHandler = (id) => {
    const {articleActions} = this.props;
    articleActions.deleteArticle(id).then(() => {
      this.initPage();
    });
  };

  render() {
    const {article} = this.props;
    const {pagination} = article;
    const listProps = {
      pagination: {...pagination, showTotal: total => `共 ${total} 条记录`},
      dataSource: article.articleList,
      onChange: this.tableChangeHandler,
      onDelete: this.tableDeleteHandler
    };
    const headerProps = {
      onSearch: this.searchHandler,
      onAdd: this.toAddHandler
    };
    return (
      <div className="article-wrap">
        <ArticleHeader {...headerProps}/>
        <ArticleList {...listProps}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    article: state.article
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  articleActions: bindActionCreators(articleActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article));
