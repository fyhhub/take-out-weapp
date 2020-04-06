import Taro, { useCallback } from '@tarojs/taro'
import { View, Button, OpenData } from '@tarojs/components'
import { check, catchError } from '@/common'
import { UserApi } from '@/api'
import { setUserInfo } from '@/store/actions'
import { useDispatch } from '@tarojs/redux'
import './index.scss'
const Auth = () => {
  const dispatch = useDispatch()
  const handleGetUserInfo = useCallback((res) => {
    try {
      check(res.detail)
      Taro.login({
        async success({ code }) {
          const info = {
            code,
            ...res.detail.userInfo
          }
          const response = await UserApi.login(info)
          if (response.data.code === 200) {
            Taro.setStorageSync('userInfo', JSON.stringify(response.data.result))
            dispatch(setUserInfo(response.data.result))
            Taro.showToast({
              icon: 'success',
              title: '登录成功',
              duration: 1500
            }).then(() => {
              Taro.navigateBack()
            })
          }
        },
        fail() {
          catchError('登录失败')
        }
      })
    } catch(e) {
      Taro.showToast({
        icon: 'none',
        title: res.detail.errMsg || '登录出错',
        duration: 1500
      })
    }
  }, [])
  return (
    <View className='authorization'>
      <OpenData type='userAvatarUrl' style={{ width: '140rpx', height: '140rpx', marginBottom: '20rpx' }} />
      <View className='authorization-title'>外卖点餐</View>
      <View className='authorization-detail'>申请获取你的公开信息（昵称、头像等）</View>
      <Button onClick={() => {
          Taro.showToast({
            icon: 'loading',
            title: '获取用户信息',
            duration: 1500
          })
      }} openType='getUserInfo' type='primary' onGetUserInfo={handleGetUserInfo}>微信登录</Button>
    </View>
  )
}

export default Auth
