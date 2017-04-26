import 'isomorphic-fetch';
import { setToken, checkLogon, timeoutPromise, generateQueryParams } from './pure';
import { API_ROOT } from '../config';

export default (data, url, type = 'POST', timeout = 10000) => {
  let reqUrl = url;
  let headers = new Headers({
    'Content-Type': 'application/json',
    'x-auth-token': window.localStorage.getItem('x-auth-token'),
  });
  let options = {
    mode: 'cors',
    headers,
    method: type,
  };
  if (type === 'GET') {
    reqUrl = url + generateQueryParams(data);
  } else if (type === 'PUT') {
    options.body = JSON.stringify(data);
  } else if (type === 'POST') {
    options.body = JSON.stringify(data);
  } else if (type === 'DELETE') {
    // todo
  } else if (type === 'PATCH') {
    // todo
  }
  return timeoutPromise(timeout, fetch(API_ROOT + reqUrl, options))
    .then(setToken)
    .then(checkLogon);
};
