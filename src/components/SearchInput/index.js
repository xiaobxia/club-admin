/**
 * Created by xiaobxia on 2017/12/14.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';
const Option = Select.Option;

class SearchInput extends React.Component {
  static defaultProps = {
    onFetch: () => {}
  };
  static propTypes = {
    onFetch: PropTypes.func
  };
  state = {
    data: [],
    value: ''
  };
  handleChange = (value) => {
    this.setState({value});
    this.props.onFetch(value, data => this.setState({data}));
  };

  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Select
        mode="combobox"
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={this.handleChange}
      >
        {options}
      </Select>
    );
  }
}
