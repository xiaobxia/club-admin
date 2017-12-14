/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Row, Col, Form, Button, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

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

//PureComponent浅比较
class SysUserHeader extends PureComponent {

  handleSearch = (e) => {
    //使用submit
    e.preventDefault();
    this.props.onSearch(this.props.form.getFieldsValue());
  };

  handleFormReset = () => {
    const {form} = this.props;
    form.resetFields();
  };

  handleAdd = () => {
    this.props.onAdd();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="sysUser-header">
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="用户名">
                {getFieldDecorator('userName')(
                  <Input style={{width: 180}}/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="邮箱">
                {getFieldDecorator('email')(
                  <Input style={{width: 180}}/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('mobile')(
                  <Input style={{width: 180}}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{md: 8, lg: 24, xl: 48}} style={{marginBottom: 20}}>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="禁用状态">
                {getFieldDecorator('state')(
                  <Select placeholder="请选择" style={{width: 180}}>
                    <Option value="">全部</Option>
                    <Option value="A">未禁用</Option>
                    <Option value="X">已禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="锁定状态">
                {getFieldDecorator('isLocked')(
                  <Select placeholder="请选择" style={{width: 180}}>
                    <Option value="">全部</Option>
                    <Option value="Y">锁定</Option>
                    <Option value="N">未锁定</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem {...formItemLayout} label="激活状态">
                {getFieldDecorator('active')(
                  <Select placeholder="请选择" style={{width: 180}}>
                    <Option value="">全部</Option>
                    <Option value="Y">已激活</Option>
                    <Option value="N">未激活</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24} style={{marginTop: 20}}>
              <span>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button type="primary" style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                <Button type="primary" style={{marginLeft: 8}} onClick={this.handleAdd}>新建</Button>
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SysUserHeader);
