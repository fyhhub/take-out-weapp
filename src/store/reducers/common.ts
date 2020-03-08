import { setLocation } from '@/store/actions';
import { CommonModel } from '@/interfaces';
import { reducerWithInitialState } from 'typescript-fsa-reducers'

const INIT_STATE = {
  address: {} as CommonModel.ILocation
}

const reducer = reducerWithInitialState(INIT_STATE)
  .case(setLocation, (state, address) => {
    return {
      ...state,
      address
    }
  })

export default reducer
