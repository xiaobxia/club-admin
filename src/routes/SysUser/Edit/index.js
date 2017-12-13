/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Button, Form, Input, Select, DatePicker, Divider, message} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import moment from 'moment'
import {sysUserActions} from 'localStore/actions'
import {bindActionCreators} from 'redux';
import qs from 'qs'
import AppEditor from 'localComponent/Editor'

const {RangePicker} = DatePicker;
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

class SysUserEdit extends PureComponent {
  state = {
    pageType: 'add',
    id: ''
  };

  componentWillMount() {
    const query = this.getSearch();
    //只要id
    if (query.id) {
      this.setState({pageType: 'edit', id: query.id});
      this.querySysUser(qs.stringify({
        id: query.id
      }));
    } else {
      this.props.sysUserActions.clearCurrentSysUser();
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

  querySysUser = (queryString) => {
    const {sysUserActions} = this.props;
    sysUserActions.querySysUser(queryString);
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  getFormData = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    return data;
  };

  getEditorValue = () => {
    return this.editor.getValue();
  };

  saveHandler = () => {
    const {sysUserActions} = this.props;
    const data = this.getFormData();
    data.content = this.getEditorValue();
    data.userUuid = this.props.app.loginUser.userUuid;
    console.log(data)
    if (this.state.pageType === 'add') {
      sysUserActions.addSysUser(data).then((data) => {
        if (data.success) {
          message.success('添加成功');
          this.props.history.push('/sysUser');
        } else {
          message.error(data.msg);
        }
      });
    } else {
      data.id = this.state.id;
      sysUserActions.saveSysUser(data).then((data) => {
        if (data.success) {
          message.success('修改成功');
          this.props.history.push('/sysUser');
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
      sysUser
    } = this.props;
    const {currentSysUser} = sysUser;
    return (
      <div className="sysUser-wrap">
        <Button onClick={this.goBackHandler}>返回</Button>
        <Divider type="horizontal"/>
        <Form>
          <FormItem label="文章类型">
            {getFieldDecorator('sysUserType', {
              initialValue: currentSysUser.sysUserType,
              rules: [{required: true, message: '请选择文章类型'}]
            })(
              <Select placeholder="请选择" style={{width: 200}}>
                <Option value="question">问答</Option>
                <Option value="activity">活动</Option>
                <Option value="friend">交友</Option>
                <Option value="game">游戏</Option>
                <Option value="partTime">兼职</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              initialValue: currentSysUser.title,
              rules: [{required: true, message: '请输入标题'}]
            })(
              <Input/>
            )}
          </FormItem>
        </Form>
        <AppEditor ref={(div) => {
          this.editor = div;
        }} sourceData={currentSysUser.content}/>
        <Button type="primary" onClick={this.saveHandler}>保存</Button>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    sysUser: state.sysUser,
    app: state.app
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  sysUserActions: bindActionCreators(sysUserActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(SysUserEdit)));
