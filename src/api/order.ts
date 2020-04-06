import axios from '@/common/request'
import { JSONResponse, OrderModel } from '@/interfaces'
const api = {
  create: '/order/create',
  list: '/order/list',
  delete: '/order/delete',
  pay: '/order/pay',
}
export function create(data) {
  return axios.post<JSONResponse<OrderModel.Order>>(api.create, data)
}

export function list(openid) {
  return axios.get<JSONResponse<OrderModel.Order[]>>(api.list, {
    params: {
      openid
    }
  })
}

export function deleteOrder(id) {
  return axios.get<JSONResponse<any>>(api.delete, {
    params: {
      id
    }
  })
}

export function pay(id: number) {
  return axios.get<JSONResponse<any>>(api.pay, {
    params: {
      id
    }
  })
}
