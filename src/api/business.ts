import axios from '@/common/request'
import { JSONResponse, GetBusinessList } from '@/interfaces'
const api = {
  list: '/business/list'
}
export function list() {
  return axios.get<JSONResponse<GetBusinessList>>(api.list)
}
