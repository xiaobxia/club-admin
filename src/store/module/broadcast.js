/**
 * Created by xiaobxia on 2017/12/7.
 */
import http from 'localUtil/httpUtil';
const BROADCAST_QUERY_BROADCASTS_BEGIN = 'BROADCAST_QUERY_BROADCASTS_BEGIN';
const BROADCAST_QUERY_BROADCASTS_SUC = 'BROADCAST_QUERY_BROADCASTS_SUC';
const BROADCAST_QUERY_BROADCAST_BEGIN = 'BROADCAST_QUERY_BROADCAST_BEGIN';
const BROADCAST_QUERY_BROADCAST_SUC = 'BROADCAST_QUERY_BROADCAST_SUC';

export const broadcastActions = {
  queryBroadcasts(queryString) {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCASTS_BEGIN});
      return http.get('broadcasts?' + queryString).then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCASTS_SUC, data});
        return data;
      });
    };
  },
  queryBroadcast(queryString) {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCAST_BEGIN});
      return http.get('broadcasts/item?' + queryString).then((data) => {
        dispatch({type: BROADCAST_QUERY_BROADCAST_SUC, data});
        return data;
      });
    };
  },
  clearCurrentBroadcast() {
    return (dispatch, getState) => {
      dispatch({type: BROADCAST_QUERY_BROADCAST_BEGIN});
    };
  },
  addBroadcast(data) {
    return (dispatch, getState) => {
      return http.post('broadcasts/add', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  saveBroadcast(data) {
    return (dispatch, getState) => {
      return http.post('broadcasts/save', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  deleteBroadcast(id) {
    return (dispatch, getState) => {
      return http.get('broadcasts/delete?id=' + id).then((data) => {
        console.log(data)
        return data;
      });
    };
  }
};

const broadcastStore = {
  broadcastList: [],
  pagination: {},
  currentBroadcast: {}
};
export const broadcastReducers = (state = broadcastStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case BROADCAST_QUERY_BROADCASTS_BEGIN: {
      store.broadcastList = [];
      store.pagination = {};
      return store;
    }
    case BROADCAST_QUERY_BROADCASTS_SUC: {
      const data = action.data;
      store.broadcastList = data.list;
      store.pagination = data.page;
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
