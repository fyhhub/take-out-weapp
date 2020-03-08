import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Bill } from '@/components'
import { AtSwipeAction  } from 'taro-ui'
import './index.scss'
const swiperAction: any = [
  {
    text: '删除',
    style: {
      background: 'red',
      color: '#fff'
    }
  }
]
const BillList = () => {
  return (
    <View className='billlist'>
      <AtSwipeAction options={swiperAction}>
        <Bill/>
      </AtSwipeAction>
      <View style={{ height: '15rpx' }}></View>
      <AtSwipeAction options={swiperAction}>
        <Bill/>
      </AtSwipeAction>
      <View style={{ height: '15rpx' }}></View>
      <AtSwipeAction options={swiperAction}>
        <Bill/>
      </AtSwipeAction>
      <View style={{ height: '15rpx' }}></View>
      <AtSwipeAction options={swiperAction}>
        <Bill/>
      </AtSwipeAction>
    </View>
  )
}

export default BillList
