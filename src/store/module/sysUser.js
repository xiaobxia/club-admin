/**
 * Created by xiaobxia on 2017/12/7.
 */
import http from 'localUtil/httpUtil';
const SYSUSER_QUERY_SYSUSERS_BEGIN = 'SYSUSER_QUERY_SYSUSERS_BEGIN';
const SYSUSER_QUERY_SYSUSERS_SUC = 'SYSUSER_QUERY_SYSUSERS_SUC';
const SYSUSER_QUERY_SYSUSER_BEGIN = 'SYSUSER_QUERY_SYSUSER_BEGIN';
const SYSUSER_QUERY_SYSUSER_SUC = 'SYSUSER_QUERY_SYSUSER_SUC';

export const sysUserActions = {
  querySysUsers(queryString) {
    return (dispatch, getState) => {
      dispatch({type: SYSUSER_QUERY_SYSUSERS_BEGIN});
      return http.get('sysUsers?' + queryString).then((data) => {
        dispatch({type: SYSUSER_QUERY_SYSUSERS_SUC, data});
        return data;
      });
    };
  },
  querySysUser(queryString) {
    return (dispatch, getState) => {
      dispatch({type: SYSUSER_QUERY_SYSUSER_BEGIN});
      return http.get('sysUsers/item?' + queryString).then((data) => {
        dispatch({type: SYSUSER_QUERY_SYSUSER_SUC, data});
        return data;
      });
    };
  },
  clearCurrentSysUser() {
    return (dispatch, getState) => {
      dispatch({type: SYSUSER_QUERY_SYSUSER_BEGIN});
    };
  },
  addSysUser(data) {
    return (dispatch, getState) => {
      return http.post('sysUsers/add', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  saveSysUser(data) {
    return (dispatch, getState) => {
      return http.post('sysUsers/save', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  deleteSysUser(id) {
    return (dispatch, getState) => {
      return http.get('sysUsers/delete?id=' + id).then((data) => {
        console.log(data)
        return data;
      });
    };
  }
};

const sysUserStore = {
  sysUserList: [],
  pagination: {},
  currentSysUser: {}
};
export const sysUserReducers = (state = sysUserStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case SYSUSER_QUERY_SYSUSERS_BEGIN: {
      store.sysUserList = [];
      store.pagination = {};
      return store;
    }
    case SYSUSER_QUERY_SYSUSERS_SUC: {
      const data = action.data;
      store.sysUserList = data.list;
      store.pagination = data.page;
      return store;
    }
    case SYSUSER_QUERY_SYSUSER_BEGIN: {
      store.currentSysUser = {};
      return store;
    }
    case SYSUSER_QUERY_SYSUSER_SUC: {
      const data = action.data;
      store.currentSysUser = data.item;
      return store;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};
