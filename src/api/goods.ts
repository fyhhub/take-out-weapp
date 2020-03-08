import axios from '@/common/request'
import { JSONResponse, GoodsModel } from '@/interfaces'
const api = {
  list: '/goods/list'
}
export function list(params) {
  return axios.get<JSONResponse<GoodsModel.Goods[]>>(api.list, {
    params
  })
}
