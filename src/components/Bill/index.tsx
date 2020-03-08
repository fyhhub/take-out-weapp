import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'
import { AtButton } from 'taro-ui'
const Bill = () => {
  return (
    <View className='bill'>
      <View className='bill-top'>
        <View className='bill-top-wrap'>
          <Image className='bill-top-show' src='//p0.meituan.net/200.0/deal/7341b59fcf1009ba983d2438f506f11a19112.jpg@267h_267w_2e_90Q'/>
          <View className='bill-top-name'>
            江西正宗瓦罐汤 >
          </View>
        </View>
        <View className='bill-top-status'>已完成</View>
      </View>
      <View className='bill-good'>
        <View className='bill-good-item'>
          <View className='bill-good-item_show onlyone'>
            <Image src='//p1.meituan.net/200.0/deal/8ccd9824305617e68ac1e89e4d50f77556612.jpg@100_0_450_450a%7C267h_267w_2e_90Q'/>
            <View>扬州炒饭+任意排骨汤</View>
          </View>
          <View className='bill-good-item_price'>
            <View>¥11.5</View>
            <View>共1件</View>
          </View>
        </View>
      </View>
      <View className='bill-btn'>
        <AtButton className='bill-btn-status' type='secondary' size='small'>再来一单</AtButton>
      </View>
    </View>
  )
}

export default Bill
