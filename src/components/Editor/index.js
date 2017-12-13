/**
 * Created by xiaobxia on 2017/12/5.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd'
import Simditor from 'simditor';
import jQuery from 'jquery';

//PureComponent浅比较
class AppEditor extends PureComponent {
  state = {
    sourceData: ''
  };
  static defaultProps = {
    sourceData: ''
  };
  static propTypes = {
    sourceData: PropTypes.string
  };

  componentDidMount() {
    this.editor = new Simditor({
      textarea: jQuery(this.textbox),
      toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'indent', 'outdent', 'alignment', 'hr'],
      upload: {
        url: '', //文件上传的接口地址
        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
        fileKey: 'file', //服务器端获取文件数据的参数名
        connectionCount: 3,
        leaveConfirm: '正在上传文件'
      }
    });
    if (this.props.sourceData) {
      this.editor.setValue(this.props.sourceData);
    }
    this.editor.on('valuechanged', (e, src) => {
      // todo
    });
  }

  componentWillUnmount() {
    if (this.editor) {
      console.log('destroy');
      this.editor.destroy();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sourceData !== this.state.sourceData) {
      if (this.editor) {
        this.editor.setValue(nextProps.sourceData);
        this.setState({
          sourceData: nextProps.sourceData
        });
      }
    }
  }

  getValue = () => {
    return this.editor.getValue();
  };

  setValue = (text) => {
    return this.editor.setValue(text);
  };

  render() {
    let val = this.props.val;
    return (
      <div>
        <textarea
          className="form-control"
          ref={(div) => {
            this.textbox = div;
          }}
          rows="30"
        >{val}</textarea>
      </div>
    );
  }
}

export default AppEditor;
