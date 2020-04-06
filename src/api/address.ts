import axios from '@/common/request'
import { JSONResponse, AddressModel } from '@/interfaces'
const api = {
  create: '/address/create',
  list: '/address/list',
  delete: '/address/delete',
  update: '/address/update',
  set: '/address/set'
}
export function createAddress(data) {
  return axios.post<JSONResponse<AddressModel.Address>>(api.create, data)
}
export function getAddressList(openid) {
  return axios.get<JSONResponse<AddressModel.Address[]>>(api.list, {
    params: {
      openid
    }
  })
}
export function deleteAddress(id) {
  return axios.get<JSONResponse<any>>(api.delete, {
    params: {
      id
    }
  })
}
export function updateAddress(data) {
  return axios.post<JSONResponse<any>>(api.update, data)
}

export function setDefaultAddress(id?: number, def?: number) {
  return axios.get<JSONResponse<any>>(api.set, {
    params: {
      id,
      def
    }
  })
}
