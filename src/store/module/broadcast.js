/**
 * Created by xiaobxia on 2017/12/7.
 */
import http from 'localUtil/httpUtil';
const BROADCAST_QUERY_BROADCASTS_BEGIN = 'BROADCAST_QUERY_BROADCASTS_BEGIN';
const BROADCAST_QUERY_BROADCASTS_SUC = 'BROADCAST_QUERY_BROADCASTS_SUC';
const BROADCAST_QUERY_BROADCASTS_COUNT_BEGIN = 'BROADCAST_QUERY_BROADCASTS_COUNT_BEGIN';
const BROADCAST_QUERY_BROADCASTS_COUNT_SUC = 'BROADCAST_QUERY_BROADCASTS_COUNT_SUC';
const BROADCAST_QUERY_BROADCAST_BEGIN = 'BROADCAST_QUERY_BROADCAST_BEGIN';
const BROADCAST_QUERY_BROADCAST_SUC = 'BROADCAST_QUERY_BROADCAST_SUC';

export const broadcastActions = {
  queryBroadcasts(queryString) {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCASTS_BEGIN});
      return http.get('broadcasts?' + queryString).then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCASTS_SUC, data});
      });
    };
  },
  queryBroadcastsCount() {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCASTS_COUNT_BEGIN});
      return http.get('broadcasts/count').then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCASTS_COUNT_SUC, data});
      });
    };
  },
  queryBroadcast(uuid) {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCAST_BEGIN});
      return http.get('broadcasts/' + uuid).then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCAST_SUC, data});
      });
    };
  }
};

const broadcastStore = {
  broadcastList: [],
  pageIndex: 1,
  pageSize: 10,
  total: 0,
  currentBroadcast: {}
};
export const broadcastReducers = (state = broadcastStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case BROADCAST_QUERY_BROADCASTS_BEGIN: {
      store.broadcastList = [];
      store.pageIndex = 1;
      store.pageSize = 10;
      return store;
    }
    case BROADCAST_QUERY_BROADCASTS_SUC: {
      const data = action.data;
      store.broadcastList = data.list;
      store.pageIndex = data.page.pageIndex;
      store.pageSize = data.page.pageSize;
      return store;
    }
    case BROADCAST_QUERY_BROADCASTS_COUNT_BEGIN: {
      store.total = 0;
      return store;
    }
    case BROADCAST_QUERY_BROADCASTS_COUNT_SUC: {
      const data = action.data;
      store.total = data.count;
      return store;
    }
    case BROADCAST_QUERY_BROADCAST_BEGIN: {
      store.currentBroadcast = {};
      return store;
    }
    case BROADCAST_QUERY_BROADCAST_SUC: {
      const data = action.data;
      store.currentBroadcast = data.item;
      return store;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};
