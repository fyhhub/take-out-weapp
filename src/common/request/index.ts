import { catchError } from '@/common/util/toast';
import { axios } from 'taro-axios';


if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://192.168.0.108:7001/wx'
}
// else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = 'https://www.ceshi.com';
// }
// else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://192.168.0.103:7001/wx';
// }

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


axios.interceptors.request.use(
  config => {
      return config;
  },
  error => {
      return Promise.reject(error);
})

axios.interceptors.response.use(
  response => {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      const { data } = response
      if (response.status === 200) {
        if (data.type === "ERROR_DATA") {
          catchError(data)
          return Promise.reject(response);
        }
        return Promise.resolve(response);
      } else {
          return Promise.reject(response);
      }
  },
  error => {
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case 403:
              catchError(error.response.data.message)
              break
            case 404:
              catchError('网络请求不存在')
              break
            default:
              catchError(error.response.data.message)
        }
        return Promise.reject(error.response);
    } else {
      catchError(error)
      return Promise.reject(error);
    }
  }
)


export default axios
