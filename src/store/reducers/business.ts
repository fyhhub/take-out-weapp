import { BusinessModel } from '@/interfaces';
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setPending, setBusinessList } from '@/store/actions'
const INIT_STATE = {
  data: [] as BusinessModel.Business[],
  pageSize: 20,
  pageNo: 0,
  totalPage: 0,
  totalCount: 0,
  pending: false,
  locationMap: {},
  dataMap: {} as { [id: string]: BusinessModel.Business }
}

const reducer = reducerWithInitialState(INIT_STATE)
  .case(setPending, (state, pending) => ({
    ...state,
    pending
  }))
  .case(setBusinessList, (state, data) => ({
    ...state,
    ...data,
    data: [...data.data]
  }))


export default reducer
