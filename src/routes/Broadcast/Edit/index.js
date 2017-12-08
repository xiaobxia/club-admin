/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Button, Form, Input, Select, DatePicker, Divider} from 'antd';
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
    let data = this.props.form.getFieldsValue();
    data.startDate = data.startAndEndDate[0].format(dateFormat);
    data.endDate = data.startAndEndDate[1].format(dateFormat);
    delete data.startAndEndDate;
    console.log(data);
    return data;
  };

  saveHandler = () => {
    const {broadcastActions} = this.props;
    const data = this.getFormData();
    if (this.state.pageType === 'add') {
      broadcastActions.addBroadcast(data);
    } else {

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
        <Button type="primary">编辑</Button>
        <Divider type="horizontal"/>
        <Form>
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
          <FormItem {...formItemLayout} label="上线与下线时间">
            {getFieldDecorator('startAndEndDate', {
              initialValue: [moment(currentBroadcast.startDate), moment(currentBroadcast.endDate)],
              rules: [{required: true, message: '请输入上线与下线时间'}]
            })(
              <RangePicker format="YYYY-MM-DD"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue: currentBroadcast.title,
              rules: [{required: true, message: '请输入标题'}]
            })(
              <Input/>
            )}
          </FormItem>
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
