/**
 * Created by xiaobxia on 2017/12/7.
 */
import http from 'localUtil/httpUtil';
const BROADCAST_QUERY_BROADCASTS_BEGIN = 'BROADCAST_QUERY_BROADCASTS_BEGIN';
const BROADCAST_QUERY_BROADCASTS_SUC = 'BROADCAST_QUERY_BROADCASTS_SUC';

export const sysLogAuditActions = {
  querySysLogAudits(queryString) {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCASTS_BEGIN});
      return http.get('sysLogAudits?' + queryString).then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCASTS_SUC, data});
        return data;
      });
    };
  }
};

const sysLogAuditStore = {
  sysLogAuditList: [],
  pagination: {}
};
export const sysLogAuditReducers = (state = sysLogAuditStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case BROADCAST_QUERY_BROADCASTS_BEGIN: {
      store.sysLogAuditList = [];
      store.pagination = {};
      return store;
    }
    case BROADCAST_QUERY_BROADCASTS_SUC: {
      const data = action.data;
      store.sysLogAuditList = data.list;
      store.pagination = data.page;
      return store;
    }
    default: {
      return state
    }
  }
};
