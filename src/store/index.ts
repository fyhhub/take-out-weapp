import { createStore, applyMiddleware, compose } from 'redux'
import { useSelector as useReduxSelector } from '@tarojs/redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !== 'quickapp') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)
export type StoreType = ReturnType<typeof rootReducer>
export const useSelector: <TSelected>(selector: (state: StoreType) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean) => TSelected = useReduxSelector
export default function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}
