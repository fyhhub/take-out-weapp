import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { GoodsModel } from '@/interfaces'
import { setGoodsList } from '@/store/actions'
const INIT_STATE = {
  list: {} as GoodsModel.GoodsList
}

const reducer = reducerWithInitialState(INIT_STATE)
  .case(setGoodsList, (state, data) => ({
    ...state,
    list: {
      ...JSON.parse(JSON.stringify(data))
    }
  }))
export default reducer
