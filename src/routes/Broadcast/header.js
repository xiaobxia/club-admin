/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Row, Col, Form, Button, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

//PureComponent浅比较
class BroadcastHeader extends PureComponent {

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
      <div className="broadcast-header">
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{md: 8, lg: 24, xl: 48}}>
            <Col md={8} sm={24}>
              <FormItem label="状态">
                {getFieldDecorator('state')(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="">全部</Option>
                    <Option value="U">未启用</Option>
                    <Option value="A">启用</Option>
                    <Option value="X">禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
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

export default Form.create()(BroadcastHeader);
