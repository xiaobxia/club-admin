/**
 * Created by xiaobxia on 2017/12/7.
 */
import http from 'localUtil/httpUtil';
const ARTICLE_QUERY_ARTICLES_BEGIN = 'ARTICLE_QUERY_ARTICLES_BEGIN';
const ARTICLE_QUERY_ARTICLES_SUC = 'ARTICLE_QUERY_ARTICLES_SUC';
const ARTICLE_QUERY_ARTICLE_BEGIN = 'ARTICLE_QUERY_ARTICLE_BEGIN';
const ARTICLE_QUERY_ARTICLE_SUC = 'ARTICLE_QUERY_ARTICLE_SUC';

export const articleActions = {
  queryArticles(queryString) {
    return (dispatch, getState) => {
      dispatch({type: ARTICLE_QUERY_ARTICLES_BEGIN});
      return http.get('articles?' + queryString).then((data) => {
        dispatch({type: ARTICLE_QUERY_ARTICLES_SUC, data});
        return data;
      });
    };
  },
  queryArticle(queryString) {
    return (dispatch, getState) => {
      dispatch({type: ARTICLE_QUERY_ARTICLE_BEGIN});
      return http.get('articles/item?' + queryString).then((data) => {
        dispatch({type: ARTICLE_QUERY_ARTICLE_SUC, data});
        return data;
      });
    };
  },
  clearCurrentArticle() {
    return (dispatch, getState) => {
      dispatch({type: ARTICLE_QUERY_ARTICLE_BEGIN});
    };
  },
  addArticle(data) {
    return (dispatch, getState) => {
      return http.post('articles/add', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  saveArticle(data) {
    return (dispatch, getState) => {
      return http.post('articles/save', data).then((data) => {
        console.log(data)
        return data;
      });
    };
  },
  deleteArticle(id) {
    return (dispatch, getState) => {
      return http.get('articles/delete?id=' + id).then((data) => {
        console.log(data)
        return data;
      });
    };
  }
};

const articleStore = {
  articleList: [],
  pagination: {},
  currentArticle: {}
};
export const articleReducers = (state = articleStore, action) => {
  let store = Object.assign({}, state);
  switch (action.type) {
    case ARTICLE_QUERY_ARTICLES_BEGIN: {
      store.articleList = [];
      store.pagination = {};
      return store;
    }
    case ARTICLE_QUERY_ARTICLES_SUC: {
      const data = action.data;
      store.articleList = data.list;
      store.pagination = data.page;
      return store;
    }
    case ARTICLE_QUERY_ARTICLE_BEGIN: {
      store.currentArticle = {};
      return store;
    }
    case ARTICLE_QUERY_ARTICLE_SUC: {
      const data = action.data;
      store.currentArticle = data.item;
      return store;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};
