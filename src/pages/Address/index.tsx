import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import edit from '@/assets/images/edit.png'
import './index.scss'

const Address = () => {
  const toPage = (url) => {
    Taro.navigateTo({ url })
  }
  return (
    <View className="address content b-t">
      <View className="list b-b">
        <View className="wrapper">
          <View className="address-box">
            <Text className="tag">默认</Text>
            <Text className="address">贵族皇仕牛排(东城店) B区</Text>
          </View>
          <View className="u-box">
            <Text className="name">刘晓晓</Text>
            <Text className="mobile">18666666666</Text>
          </View>
        </View>
        <View style={{ height: '50rpx', width: '1rpx', backgroundColor: 'rgba(0,0,0, 0.1)', marginRight: '30rpx' }}></View>
        <Image onClick={() => toPage('/pages/AddressManager/index')} src={edit} style={{ width: '40rpx', height: '40rpx' }}/>
      </View>
      <Button className="add-btn" onClick={() => toPage('/pages/AddressManager/index')}>新增地址</Button>
	  </View>
  )
}

export default Address
