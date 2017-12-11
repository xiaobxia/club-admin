/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Button, Form, Input, Select, DatePicker, Divider, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import {systemMessageActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'

const Option = Select.Option;
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

class SystemMessageEdit extends PureComponent {
  state = {
    pageType: 'add',
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    if (query.id) {
      this.setState({pageType: 'edit', id: query.id});
      this.querySystemMessage(qs.stringify({
        id: query.id
      }));
    } else {
      this.props.systemMessageActions.clearCurrentSystemMessage();
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

  querySystemMessage = (queryString) => {
    const {systemMessageActions} = this.props;
    systemMessageActions.querySystemMessage(queryString);
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  getFormData = () => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    const time = ' 00:00:00';
    let data = this.props.form.getFieldsValue();
    //需要为0点
    data.startDate = data.startDate.format(dateFormat).slice(0, 10) + time;
    console.log(data);
    return data;
  };

  saveHandler = () => {
    const {systemMessageActions} = this.props;
    const data = this.getFormData();
    if (this.state.pageType === 'add') {
      systemMessageActions.addSystemMessage(data).then((data) => {
        if (data.success) {
          message.success('添加成功');
          this.props.history.push('/systemMessage');
        } else {
          message.error(data.msg);
        }
      });
    } else {
      data.id = this.state.id;
      systemMessageActions.saveSystemMessage(data).then((data) => {
        if (data.success) {
          message.success('修改成功');
          this.props.history.push('/systemMessage');
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
      systemMessage
    } = this.props;
    const {currentSystemMessage} = systemMessage;
    return (
      <div className="systemMessage-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Divider type="horizontal"/>
        <Form>
          <FormItem {...formItemLayout} label="发送时间">
            {getFieldDecorator('startDate', {
              initialValue: moment(currentSystemMessage.startDate),
              rules: [{required: true, message: '请输入发送时间'}]
            })(
              <DatePicker format="YYYY-MM-DD"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue: currentSystemMessage.title,
              rules: [{required: true, message: '请输入标题'}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('state', {
              initialValue: currentSystemMessage.state
            })(
              <Select placeholder="请选择" style={{width: 200}}>
                <Option value="U">未启用</Option>
                <Option value="A">启用</Option>
                <Option value="X">禁用</Option>
              </Select>
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
    systemMessage: state.systemMessage
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  systemMessageActions: bindActionCreators(systemMessageActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(SystemMessageEdit)));
