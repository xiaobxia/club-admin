/**
 * Created by xiaobxia on 2017/10/19.
 */
import { combineReducers } from 'redux'
import {appReducers} from './module/app';
export default combineReducers({
  app: appReducers
})
