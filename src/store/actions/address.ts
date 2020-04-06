import actionCreatorFactory from 'typescript-fsa'
import { Dispatch } from 'redux'
import { AddressModel } from '@/interfaces'
import { AddressApi } from '@/api'
import { validate, catchError, toast } from '@/common'
import Taro from '@tarojs/taro'
const actionCreator = actionCreatorFactory('@address')

export const addAddress = actionCreator<AddressModel.Address>('ADD_ADDRESS')

export const setAddressList = actionCreator<AddressModel.Address[]>('SET_ADDRESS_LIST')

export const setDefaultAddressAction = actionCreator<AddressModel.Address>('SET_DEFAULT_ADDRESS')

export const createAddress = (form: AddressModel.Address) => async (dispatch: Dispatch) => {
  try {
    Taro.showLoading({
      title: '加载中...'
    })
    const res = await AddressApi.createAddress(form)
    if (validate(res)) {
      dispatch(addAddress(res.data.result))
      Taro.hideLoading()
      Taro.showToast({
        title: '新增成功',
        icon: 'success',
        duration: 2000
      })
      Taro.navigateBack()
    }
  } catch (e) {
    catchError(e)
    Taro.hideLoading()
  }
}

export const getAddressList = (openid: string) => async (dispatch: Dispatch) => {
  try {
    Taro.showLoading({
      title: '加载中...'
    })
    const res = await AddressApi.getAddressList(openid)
    if (validate(res)) {
      dispatch(setAddressList(res.data.result))
      Taro.setStorageSync('address', JSON.stringify(res.data.result))
      Taro.hideLoading()
    }
  } catch (e) {
    catchError(e)
    Taro.hideLoading()
  }
}

export const setDefaultAddress = ({ id, def }) => async (dispatch: Dispatch) => {
  try {
    const res = await AddressApi.setDefaultAddress(id, def)
    if (validate(res)) {
      const address = res.data.result.find(item => item.default === 1)
      dispatch(setDefaultAddressAction(address))
    }
  } catch (e) {
    catchError(e)
  }
}
