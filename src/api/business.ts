import axios from '@/common/request'
import { JSONResponse, GetBusinessList } from '@/interfaces'
const api = {
  list: '/business/list',
  search: '/business/search'
}
export function list() {
  return axios.get<JSONResponse<GetBusinessList>>(api.list)
}

export function search(params, type) {
  return axios.get<JSONResponse<any>>(api.search, {
    params: {
      [type]: params[type]
    }
  })
}
