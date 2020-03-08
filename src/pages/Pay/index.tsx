import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from '@/store'
import { processImage } from '@/common/util/process'
import './index.scss'

const Pay = () => {
  const address = useSelector(state => state.common.address)
  const goodsList = useSelector(state => state.goods.list)
  const cart = useSelector(state => state.cart.cart)
  return (
    <View className='pay'>
      <View className='pay-top'>
        <View className='pay-top-wenan'>订单配送至</View>
        <View className='pay-top-address'>武汉东湖学院5栋604 </View>
        <View className='pay-top-user'>
          <Text>范义辉</Text>
          <Text style={{ marginLeft: '15rpx' }}>17671705929</Text>
        </View>
        <View className='pay-top-time'>
          <View className='pay-top-time-dt'>
            <View>送达时间</View>
            <View style={{ color: '#4391fa' }}>尽快送达(16:55送达)</View>
          </View>
          <View className='pay-top-time-mode'>
            <View>支付方式</View>
            <View style={{ color: '#4391fa' }}>支付宝</View>
          </View>
        </View>
        <View className='pay-top-info'>
          <View className='pay-top-info-business'>1点点</View>
          {
            Object.keys(cart).map(item => {
              const goods = goodsList[item]
              return (
                <View className='pay-top-info-goods'>
                  <Image src={processImage(goods.goods_image)}/>
                  <View className='pay-top-info-goods-info'>
                    <View className='pay-top-info-goods-info-name'>
                      { goods.goods_name }
                    </View>
                    <View className='pay-top-info-goods-info-detail'>
                      { goods.goods_detail }
                    </View>
                  </View>
                  <View className='pay-top-info-goods-amount'>*{ cart[item] }</View>
                  <View className='pay-top-info-goods-price'>¥{ (goods.goods_discount * goods.goods_price) / 10 * cart[item] }</View>
                </View>
              )
            })
          }

        </View>
      </View>
    </View>
  )
}

export default Pay
