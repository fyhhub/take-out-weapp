import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { OrderModel } from '@/interfaces'
import { setOrderList, addOrder, setOrderPending, setCurrentOrder } from '@/store/actions'
const INIT_STATE = {
  list: [] as OrderModel.Order[],
  noCommentList: [] as OrderModel.Order[],
  refundList: [] as OrderModel.Order[],
  pending: false,
  current: 0
}

const reducer = reducerWithInitialState(INIT_STATE)
.case(setOrderList, (state, obj) => {
  return {
    ...state,
    list: [...obj.list],
    noCommentList: [...obj.noCommentList],
    refundList: [...obj.refundList],
  }
})
.case(addOrder, (state, order) => {
  return {
    ...state,
    list: [...state.list, order]
  }
})
.case(setOrderPending, (state, pending) => {
  return {
    ...state,
    pending
  }
})
.case(setCurrentOrder, (state, id) => {
  return {
    ...state,
    current: id
  }
})
export default reducer
