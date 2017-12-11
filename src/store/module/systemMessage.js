/**
 * Created by xiaobxia on 2017/12/11.
 */
import http from 'localUtil/httpUtil';
const SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_BEGIN = 'SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_BEGIN';
const SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_SUC = 'SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_SUC';
const SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_BEGIN = 'SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_BEGIN';
const SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_SUC = 'SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_SUC';

export const systemMessageActions = {
  querySystemMessages(queryString) {
    return (dispatch, getState) => {
      dispatch({type: SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_BEGIN});
      return http.get('systemMessages?' + queryString).then((data) => {
        dispatch({type: SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_SUC, data});
        return data;
      });
    };
  },
  querySystemMessage(queryString) {
    return (dispatch, getState) => {
      dispatch({type: SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_BEGIN});
      return http.get('systemMessages/item?' + queryString).then((data) => {
        dispatch({type: SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_SUC, data});
        return data;
      });
    };
  },
  clearCurrentSystemMessage() {
    return (dispatch, getState) => {
      dispatch({type: SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_BEGIN});
    };
  },
  addSystemMessage(data) {
    return (dispatch, getState) => {
      return http.post('systemMessages/add', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  saveSystemMessage(data) {
    return (dispatch, getState) => {
      return http.post('systemMessages/save', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  deleteSystemMessage(id) {
    return (dispatch, getState) => {
      return http.get('systemMessages/delete?id=' + id).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  updateSystemMessages() {
    return (dispatch, getState) => {
      return http.get('systemMessages/clearTable').then((data) => {
        console.log(data)
        return data;
      });
    };
  }
};

const systemMessageStore = {
  systemMessageList: [],
  pagination: {},
  currentSystemMessage: {}
};
export const systemMessageReducers = (state = systemMessageStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_BEGIN: {
      store.systemMessageList = [];
      store.pagination = {};
      return store;
    }
    case SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGES_SUC: {
      const data = action.data;
      store.systemMessageList = data.list;
      store.pagination = data.page;
      return store;
    }
    case SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_BEGIN: {
      store.currentSystemMessage = {};
      return store;
    }
    case SYSTEM_MESSAGE_QUERY_SYSTEM_MESSAGE_SUC: {
      const data = action.data;
      store.currentSystemMessage = data.item;
      return store;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};
