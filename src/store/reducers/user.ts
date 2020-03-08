import { UserModel } from '@/interfaces';
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setUserInfo } from '@/store/actions'
const INIT_STATE = {
  userinfo: {} as UserModel.UserInfo
}

const reducer = reducerWithInitialState(INIT_STATE)
  .case(setUserInfo, (state, userinfo) => {
    return {
      ...state,
      userinfo: {
        ...userinfo
      }
    }
  })


export default reducer
