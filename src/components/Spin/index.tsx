import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

const Spin = () => {
  return (
    <View className='spin'>
      <View id="loading">
        <View id="loading-center">
          <View id="loading-center-absolute">
            <View className="object" id="object_one"></View>
            <View className="object" id="object_two"></View>
            <View className="object" id="object_three"></View>
            <View className="object" id="object_four"></View>
          </View>
          <View id="loading-center-text" style={{ fontSize: '22rpx' }}>努力加载中...</View>
        </View>
      </View>
    </View>
  )
}

export default Spin
