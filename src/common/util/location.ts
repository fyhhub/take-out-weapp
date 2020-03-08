import qqmapsdk from '@/libs/qqmap'
import Taro from '@tarojs/taro'
import { toast } from '@/common'
const key = 'XVZBZ-PJXK4-3C4UL-X7KLM-BQ556-S4B2R'
const referer = '光辉图书'
export const getDistance = (from, to): Promise<{
  distance: number
  duration: number
  from: any
  to: any
}[]> => {
  return new Promise((resolve, reject) => {
    qqmapsdk.calculateDistance({
      mode: 'driving',
      from,
      to,
      success(res) {
        resolve(res.result.elements)
      },
      fail(res) {
        toast(res.message)
        reject()
      }
    })
  })
}

export const chooseLocation = (latitude, longitude) => {
  const location = JSON.stringify({
    latitude,
    longitude
  })
  Taro.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
  });
}
