import axios from '@/common/request'
import { JSONResponse } from '@/interfaces'
import { AssessModel } from '@/interfaces/assess'
const api = {
  create: '/assess/create',
  list: '/assess/list'
}
export function create(data) {
  return axios.post<JSONResponse<any>>(api.create, data)
}


export function list(id) {
  return axios.get<JSONResponse<{
    list: AssessModel.Assess[],
    users: any
  }>>(api.list, {
    params: {
      id
    }
  })
}
