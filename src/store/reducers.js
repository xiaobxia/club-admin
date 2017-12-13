/**
 * Created by xiaobxia on 2017/10/19.
 */
import { combineReducers } from 'redux'
import {appReducers} from './module/app';
import {broadcastReducers} from './module/broadcast';
import {systemMessageReducers} from './module/systemMessage';
import {articleReducers} from './module/article';
import {sysUserReducers} from './module/sysUser';

export default combineReducers({
  app: appReducers,
  broadcast: broadcastReducers,
  systemMessage: systemMessageReducers,
  article: articleReducers,
  sysUser: sysUserReducers
})
