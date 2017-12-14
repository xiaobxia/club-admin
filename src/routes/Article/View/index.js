/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {articleActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
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
        <Button type="primary" style={{marginLeft: 8}} onClick={this.goEditHandler}>编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="id">
                <span>{currentArticle.id}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="uuid">
                <span>{currentArticle.uuid}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="创建时间">
                <span>{currentArticle.createDate}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="更新时间">
                <span>{currentArticle.updateDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="作者id">
                <span>{currentArticle.userId}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章类型">
                <span>{currentArticle.articleType}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章标签">
                <span>{currentArticle.articleTags}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章标题">
                <span>{currentArticle.title}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章点赞数">
                <span>{currentArticle.likeCount}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章评论数">
                <span>{currentArticle.commentCount}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="文章地址">
                <span>{currentArticle.url}</span>
              </FormItem>
            </Col>
          </Row>
          <h3>文章内容</h3>
          <div
            className="article-content-wrap"
            dangerouslySetInnerHTML={{__html: currentArticle.content}}
          />
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
