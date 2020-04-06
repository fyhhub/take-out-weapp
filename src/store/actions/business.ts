import actionCreatorFactory from 'typescript-fsa'
import { validate, check } from "@/common"
import { GetBusinessList } from '@/interfaces'
import { BusinessApi } from '@/api'
import { Dispatch } from 'redux'
import { getDistance } from '@/common/util/location'
import Taro from '@tarojs/taro'
const actionCreator = actionCreatorFactory('@business')

export const setBusinessList = actionCreator<GetBusinessList>('SET_BUSINESS_LIST')
export const setPending = actionCreator<boolean>('SET_PENDING')

export const getBusinessList = () => async (dispatch: Dispatch) => {
  dispatch(setPending(true))
  const res = await BusinessApi.list()
  if (validate(res)) {
    const result = res.data.result
    const loc = await Taro.getLocation({
      isHighAccuracy: true
    })
    check(loc)
    const latitude = loc.latitude
    const longitude = loc.longitude
    const map = {}
    const to = result.data.map(item => {
      const s = `${item.business_latitude},${item.business_longitude}`
      map[s] = item.business_id
      return s
    }).join(';')
    const elements = await getDistance(`${latitude},${longitude}`, to)
    const locationMap = elements.reduce((obj, e) => (obj[map[`${e.to.lat},${e.to.lng}`]] = e, obj), {})
    const dataMap = result.data.reduce((obj, item) => (obj[item.business_id] = item, obj), {})
    dispatch(setBusinessList({
      ...result,
      locationMap,
      dataMap
    }))
    dispatch(setPending(false))
  }
}
