/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {articleActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const FormItem = Form.Item;

const formItemLayout = {
  // labelCol: {
  //   xs: {span: 24},
  //   sm: {span: 8}
  // },
  // wrapperCol: {
  //   xs: {span: 24},
  //   sm: {span: 16}
  // }
};

class ArticleView extends PureComponent {
  state = {
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    this.queryArticle(qs.stringify({
      id: query.id
    }));
    this.setState({
      id: query.id
    });
  }

  componentDidMount() {
    this.props.history
  }

  getSearch = () => {
    const search = this.props.location.search;
    let query = {};
    if (search) {
      query = qs.parse(search.slice(1));
    }
    return query;
  };

  queryArticle = (queryString) => {
    const {articleActions} = this.props;
    articleActions.queryArticle(queryString);
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  goEditHandler = () => {
    this.props.history.push('/article/edit?id=' + this.state.id);
  };

  render() {
    const {article} = this.props;
    const {currentArticle} = article;
    return (
      <div className="article-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Button type="primary" onClick={this.goEditHandler}>编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <FormItem {...formItemLayout} label="id">
            <span>{currentArticle.id}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="uuid">
            <span>{currentArticle.uuid}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="创建时间">
            <span>{currentArticle.createDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="更新时间">
            <span>{currentArticle.updateDate}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="作者id">
            <span>{currentArticle.userId}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章类型">
            <span>{currentArticle.articleType}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章标签">
            <span>{currentArticle.articleTags}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章标题">
            <span>{currentArticle.title}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章点赞数">
            <span>{currentArticle.likeCount}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章评论数">
            <span>{currentArticle.commentCount}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章地址">
            <span>{currentArticle.url}</span>
          </FormItem>
          <FormItem {...formItemLayout} label="文章内容">
            <div
              className="article-content-wrap"
              dangerouslySetInnerHTML={{__html: currentArticle.content}}
            />
          </FormItem>
        </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleView));
