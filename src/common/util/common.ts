import Taro from '@tarojs/taro'
export const toPage = (url) => {
  Taro.navigateTo({
    url
  })
}
