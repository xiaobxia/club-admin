/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {PureComponent} from 'react'
import {Alert} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'



class Dashboard extends PureComponent {
  //生命周期mount
  componentDidMount() {
    console.log('Dashboard mount');
  }

  render() {
    return (
      <Alert message={(<h2>
        控制台
      </h2>)} type="success" />
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
};
// withRouter要包在connect外面， 同时用form和withRouter包裹以后都会每次的props都是不一样的
export default withRouter(connect(mapStateToProps)(Dashboard));
