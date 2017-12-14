/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Form, Divider, Button, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {systemMessageActions} from 'localStore/actions'
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

class SystemMessageView extends PureComponent {
  state = {
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    this.querySystemMessage(qs.stringify({
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

  querySystemMessage = (queryString) => {
    const {systemMessageActions} = this.props;
    systemMessageActions.querySystemMessage(queryString);
  };

  renderState = (state) => {
    switch (state) {
      case 'U':
        return <span style={{color: '#40a9ff'}}>未启用</span>;
      case 'A':
        return <span style={{color: '#69d07a'}}>启用</span>;
      case 'X':
        return <span style={{color: '#ff4444'}}>禁用</span>;
      default:
        return <span>未设置</span>;
    }
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  goEditHandler = () => {
    this.props.history.push('/systemMessage/edit?id=' + this.state.id);
  };

  render() {
    const {systemMessage} = this.props;
    const {currentSystemMessage} = systemMessage;
    return (
      <div className="systemMessage-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Button type="primary" style={{marginLeft: 8}} onClick={this.goEditHandler}>编辑</Button>
        <Divider type="horizontal"/>
        <Form>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="id">
                <span>{currentSystemMessage.id}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="id">
                <span>{currentSystemMessage.id}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="创建时间">
                <span>{currentSystemMessage.createDate}</span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="更新时间">
                <span>{currentSystemMessage.updateDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="发送时间">
                <span>{currentSystemMessage.startDate}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="状态">
            <span>
              {this.renderState(currentSystemMessage.state)}
            </span>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="标题">
                <span>{currentSystemMessage.title}</span>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="url">
                <span>{currentSystemMessage.url}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SystemMessageView));
