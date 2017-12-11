/**
 * Created by xiaobxia on 2017/10/19.
 */
import { combineReducers } from 'redux'
import {appReducers} from './module/app';
import {broadcastReducers} from './module/broadcast';
import {systemMessageReducers} from './module/systemMessage';

export default combineReducers({
  app: appReducers,
  broadcast: broadcastReducers,
  systemMessage: systemMessageReducers
})
