import { combineReducers } from 'redux'
import common from './common'
import user from './user'
import business from './business'
import goods from './goods'
import cart from './cart'

export default combineReducers({
  common,
  user,
  business,
  goods,
  cart
})
