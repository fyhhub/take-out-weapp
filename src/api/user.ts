import axios from '@/common/request'
import { JSONResponse, UserModel } from '@/interfaces'
const api = {
  login: '/user/login'
}
export function login(data) {
  console.log(data)
  return axios.post<JSONResponse<UserModel.UserInfo>>(api.login, data)
}
