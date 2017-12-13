/**
 * Created by xiaobxia on 2017/12/8.
 */
import React, {PureComponent} from 'react'
import {Row, Col, Form, Button, Input, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

//PureComponent浅比较
class ArticleHeader extends PureComponent {

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
      <div className="article-header">
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{md: 8, lg: 24, xl: 48}}>
            <Col md={8} sm={24}>
              <FormItem label="文章类型">
                {getFieldDecorator('articleType')(
                  <Select placeholder="请选择" style={{width: 200}}>
                    <Option value="">全部</Option>
                    <Option value="question">问答</Option>
                    <Option value="activity">活动</Option>
                    <Option value="friend">交友</Option>
                    <Option value="game">游戏</Option>
                    <Option value="partTime">兼职</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="文章标题">
                {getFieldDecorator('title')(
                  <Input style={{width: 200}}/>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="作者名称">
                {getFieldDecorator('userName')(
                  <Input style={{width: 200}}/>
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

export default Form.create()(ArticleHeader);
