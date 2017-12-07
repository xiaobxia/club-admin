/**
 * Created by xiaobxia on 2017/10/22.
 */
import React from 'react'
import {Alert} from 'antd';
const NoMatch = (props) => {
  return (
    <Alert
      message="404"
      description="404"
      type="warning"
      showIcon
    />
  );
};
export default NoMatch;
