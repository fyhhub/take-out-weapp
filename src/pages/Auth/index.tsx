import Taro, { useState, useCallback } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { check, catchError } from '@/common'
import './index.scss'
import { UserApi } from '@/api'
import { setUserInfo } from '@/store/actions'
import { useDispatch } from '@tarojs/redux'
import { UserModel } from '@/interfaces'
const Auth = () => {
  const dispatch = useDispatch()
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState<UserModel.UserInfo>()

  const login = useCallback(() => {
    Taro.login({
      async success({ code }) {
        const info = {
          code,
          ...user
        }
        const response = await UserApi.login(info)
        if (response.data.code === 200) {
          Taro.setStorageSync('userInfo', JSON.stringify(response.data.result))
          dispatch(setUserInfo(response.data.result))
          Taro.navigateBack()
        }
      },
      fail() {
        catchError('登录失败')
      }
    })
  }, [user])
  const handleGetUserInfo = useCallback((res) => {
    try {
      check(res.detail)
      Taro.showToast({
        icon: 'success',
        title: '授权成功',
        duration: 1500
      })

      setUser(res.detail.userInfo)
      setAuth(true)
      // setTimeout(() => {
      //   Taro.navigateBack()
      // }, 1000)
    } catch(e) {
      Taro.showToast({
        icon: 'none',
        title: res.detail.errMsg,
        duration: 1500
      })
      setAuth(false)
    }
  }, [])
  return (
    <View className='authorization'>
      <View className='authorization-title'>外卖点餐</View>
      <View className='authorization-detail'>申请获取你的公开信息（昵称、头像等）</View>
      {
        !auth ?  <Button onClick={() => {
          Taro.showToast({
            icon: 'loading',
            title: '正在获取用户信息'
          })
        }} openType='getUserInfo' type='primary' onGetUserInfo={handleGetUserInfo}>获取用户信息</Button>:
        <Button onClick={login} type='primary'>微信登录</Button>
      }
    </View>
  )
}

export default Auth
