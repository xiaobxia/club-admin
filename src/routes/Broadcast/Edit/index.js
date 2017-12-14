/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Button, Form, Input, Select, DatePicker, Divider, message, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import {broadcastActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const {RangePicker} = DatePicker;
const Option = Select.Option;
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

class BroadcastEdit extends PureComponent {
  state = {
    pageType: 'add',
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    if (query.id) {
      this.setState({pageType: 'edit', id: query.id});
      this.queryBroadcast(qs.stringify({
        id: query.id
      }));
    } else {
      this.props.broadcastActions.clearCurrentBroadcast();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSearch = () => {
    const search = this.props.location.search;
    let query = {};
    if (search) {
      query = qs.parse(search.slice(1));
    }
    return query;
  };

  queryBroadcast = (queryString) => {
    const {broadcastActions} = this.props;
    broadcastActions.queryBroadcast(queryString);
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  getFormData = () => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const time = ' 00:00:00';
    let data = this.props.form.getFieldsValue();
    //需要为0点
    data.startDate = data.startAndEndDate[0].format(dateFormat).slice(0, 10) + time;
    data.endDate = data.startAndEndDate[1].format(dateFormat).slice(0, 10) + time;
    delete data.startAndEndDate;
    console.log(data);
    return data;
  };

  saveHandler = () => {
    const {broadcastActions} = this.props;
    const data = this.getFormData();
    if (this.state.pageType === 'add') {
      broadcastActions.addBroadcast(data).then((data) => {
        if (data.success) {
          message.success('添加成功');
          this.props.history.push('/broadcast');
        } else {
          message.error(data.msg);
        }
      });
    } else {
      data.id = this.state.id;
      broadcastActions.saveBroadcast(data).then((data) => {
        if (data.success) {
          message.success('修改成功');
          this.props.history.push('/broadcast');
        } else {
          message.error(data.msg);
        }
      });
    }
  };

  render() {
    const {
      form: {
        getFieldDecorator
      },
      broadcast
    } = this.props;
    const {currentBroadcast} = broadcast;
    return (
      <div className="broadcast-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Divider type="horizontal"/>
        <Form>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="平台">
                {getFieldDecorator('platform', {
                  initialValue: currentBroadcast.platform,
                  rules: [{required: true, message: '请选择平台'}]
                })(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="web">web</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="上线与下线时间">
                {getFieldDecorator('startAndEndDate', {
                  initialValue: [moment(currentBroadcast.startDate), moment(currentBroadcast.endDate)],
                  rules: [{required: true, message: '请输入上线与下线时间'}]
                })(
                  <RangePicker format="YYYY-MM-DD"/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="标题">
                {getFieldDecorator('title', {
                  initialValue: currentBroadcast.title,
                  rules: [{required: true, message: '请输入标题'}]
                })(
                  <Input/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="状态">
                {getFieldDecorator('state', {
                  initialValue: currentBroadcast.state
                })(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="U">未启用</Option>
                    <Option value="A">启用</Option>
                    <Option value="X">禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={this.saveHandler}>保存</Button>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    broadcast: state.broadcast
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  broadcastActions: bindActionCreators(broadcastActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(BroadcastEdit)));
