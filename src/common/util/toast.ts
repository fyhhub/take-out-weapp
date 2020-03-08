import Taro from '@tarojs/taro';
export function catchError(error: any) {
  Taro.hideToast()
  Taro.hideLoading()
  let message = error.message ||
     (typeof error === 'string' ?
        error : JSON.stringify(error))

  Taro.showToast({
    title: message,
    icon: "none",
    duration: 2000
  })
  if (process.env.NODE_ENV !== 'production') {
    console.error(message)
  }
}

export function toast(message: any) {
  Taro.showToast({
    title: message,
    icon: "none",
    duration: 2000
  })
}
