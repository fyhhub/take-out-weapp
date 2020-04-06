import Taro, { useEffect, useCallback } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import edit from '@/assets/images/edit.png'
import { useAuth, validate, catchError } from '@/common'
import { useDispatch } from '@tarojs/redux'
import { getAddressList, setAddressList } from '@/store/actions'
import { useSelector } from '@/store'
import { AtSwipeAction } from 'taro-ui'
import './index.scss'
import { AddressApi } from '@/api'

const Address = () => {
  useAuth()
  const dispatch = useDispatch()
  const userinfo = useSelector(state => state.user.userinfo)
  const addressList = useSelector(state => state.address.list)

  useEffect(() => {
    dispatch(getAddressList(userinfo.openid!))
  }, [userinfo])

  const handleDeleteClick = useCallback(async (id) => {
    try {
      Taro.showLoading()
      const res = await AddressApi.deleteAddress(id)
      if (validate(res)) {
        dispatch(getAddressList(userinfo.openid!))
        Taro.hideLoading()
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    } catch (e) {
      catchError(e)
      Taro.hideLoading()
    }
  }, [])
  const toPage = (url) => {
    Taro.navigateTo({ url })
  }
  return (
    <View className="address content b-t">
      {
        addressList.map(item => (
          <AtSwipeAction
            options={[
              {
                text: '删除',
                style: {
                  backgroundColor: '#FF4949'
                },
              }
            ]}
            onClick={() => handleDeleteClick(item.id)}
          >
            <View className="list b-b">
              <View className="wrapper">
                <View className="address-box">
                  {
                    item.default ? <Text className="tag">默认</Text> : null
                  }
                  <Text className="address">{ item.address }</Text>
                </View>
                <View className="u-box">
                  <Text className="name">{ item.name }</Text>
                  <Text className="mobile">{ item.phone }</Text>
                </View>
              </View>
              <View style={{ height: '50rpx', width: '1rpx', backgroundColor: 'rgba(0,0,0, 0.1)', marginRight: '30rpx' }}></View>
              <Image onClick={() => toPage(`/pages/AddressManager/index?id=${item.id}`)} src={edit} style={{ width: '40rpx', height: '40rpx' }}/>
            </View>
          </AtSwipeAction>
        ))
      }
      <Button className="add-btn" onClick={() => toPage('/pages/AddressManager/index')}>新增地址</Button>
	  </View>
  )
}

export default Address
