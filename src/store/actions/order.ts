import actionCreatorFactory from 'typescript-fsa'
import { OrderModel } from '@/interfaces'
import { Dispatch } from 'redux'
import { OrderApi } from '@/api'
import { validate, catchError } from '@/common'
import Taro from '@tarojs/taro'
const actionCreator = actionCreatorFactory('@order')

export const addOrder = actionCreator<OrderModel.Order>('ADD_ORDER')
export const setCurrentOrder = actionCreator<number>('SET_CURRENT_ORDER')
export const setOrderList = actionCreator<{
  list: OrderModel.Order[]
  noCommentList: OrderModel.Order[]
  refundList: OrderModel.Order[]
}>('SET_ORDER_LIST')

export const setOrderPending = actionCreator<boolean>('SET_ORDER_PENDING')
export const createOrder = (order) => async (dispatch: Dispatch) => {
  try {
    Taro.showLoading({
      title: '加载中...'
    })
    const res = await OrderApi.create(order)
    if (validate(res)) {
      dispatch(setCurrentOrder(res.data.result['LAST_INSERT_ID()']))
      Taro.hideLoading()
    }
  } catch (e) {
    catchError(e)
    Taro.hideLoading()
  }
}

export const getOrderList = (openid: string) => async (dispatch: Dispatch) => {
  try {
    Taro.showLoading({
      title: '加载中...'
    })
    dispatch(setOrderPending(true))
    const res = await OrderApi.list(openid)
    if (validate(res)) {
      const ret = res.data.result
      dispatch(setOrderList({
        list: ret,
        noCommentList: ret.filter(e => !e.isComment),
        refundList: ret.filter(e => e.pay_status === 2)
      }))
      Taro.hideLoading()
      dispatch(setOrderPending(false))
    }
  } catch (e) {
    catchError(e)
    dispatch(setOrderPending(false))
    Taro.hideLoading()
  }
}
