import axios from 'axios';
import qs from 'qs';
const basePath = '/your-business/';
function makeUrl(url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  } else {
    return `${basePath}${url}`;
  }
}
function addTimestamp(url) {
  let hook = '';
  let index = url.indexOf('?');
  if (index === -1) {
    hook = '?';
  } else {
    hook = index + 1 === url.length ? '' : '&';
  }
  return `${url}${hook}timestamp=${new Date().getTime()}`;
}
const Http = {
  get (url, options) {
    let urlWithTime = addTimestamp(url);
    return axios.get(makeUrl(urlWithTime), options).then(data => data.data.data);
  },

  getRaw (url, options) {
    let urlWithTime = addTimestamp(url);
    return axios.get(makeUrl(urlWithTime), options);
  },

  post (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options).then(data => data.data.data);
  },

  postRaw (url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options);
  },

  postJSON (url, param, options) {
    return axios.post(makeUrl(url), param, options).then(data => data.data.data);
  },

  postJSONRaw (url, param, options) {
    return axios.post(makeUrl(url), param, options);
  },

  delete (url, options) {
    return axios.delete(makeUrl(url), options).then(data => data.data.data);
  },

  deleteRaw (url, options) {
    return axios.delete(makeUrl(url), options);
  },

  jsonp (url, options) {
    return axios.jsonp(makeUrl(url), options);
  },
  generateUrl (url) {
    return makeUrl(url);
  }
};

export default Http;
