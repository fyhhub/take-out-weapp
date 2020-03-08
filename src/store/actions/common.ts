import actionCreatorFactory from 'typescript-fsa'
import { check, catchError } from "@/common"
import { CommonModel } from '@/interfaces'
import Taro from '@tarojs/taro'
import { Dispatch } from 'redux'
import qqmapsdk from '@/libs/qqmap'
const actionCreator = actionCreatorFactory('@common')

export const setLocation = actionCreator<CommonModel.ILocation>('SET_LOCATION')

export const getLocationAction = () => async (dispatch: Dispatch) => {
  try {
    const geohash = await Taro.getLocation({
      isHighAccuracy: true
    })
    check(geohash)
    const { latitude, longitude } = geohash
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success(res) {
        dispatch(setLocation({
          latitude: latitude + '',
          longitude: longitude + '',
          address: res.result.address,
          data: res.result
        } as CommonModel.ILocation))
      }
    })
  } catch(e) {
    catchError(e)
  }
}

