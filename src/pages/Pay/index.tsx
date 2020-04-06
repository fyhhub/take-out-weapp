import Taro, { useEffect, useState, useRouter, useMemo, useCallback } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from '@/store'
import { processImage, processDistanceTime } from '@/common/util/process'
import { AtList, AtListItem } from 'taro-ui'
import { toPage } from '@/common'
import { useDispatch } from '@tarojs/redux'
import { AddressModel } from '@/interfaces'
import './index.scss'
import { createOrder } from '@/store/actions'

const Pay = () => {
  const userinfo = useSelector(state => state.user.userinfo)
  const goodsList = useSelector(state => state.goods.list)
  const cart = useSelector(state => state.cart.cart)
  const locationMap = useSelector(state => state.business.locationMap)
  const dataMap = useSelector(state => state.business.dataMap)
  const dispatch = useDispatch()
  const router = useRouter()
  const defaultAddress = useSelector(state => state.address.default)


  const handleAccountClick = useCallback(() => {
    if (router.params.id && router.params.total && defaultAddress) {
      const order = {
        business_id: +router.params.id,
        goods_list: Object.entries(cart).map(item => item[0] + '=' + item[1]).join(','),
        openid: userinfo.openid,
        phone: defaultAddress.phone,
        address: defaultAddress.address + ' ' + defaultAddress.detail,
        name: defaultAddress.name,
        total: +router.params.total,
        mode: 0,
        pay_status: 0,
        time: Date.now() + '',
        isComment: 0
      }
      dispatch(createOrder(order))
    }
    toPage(`/pages/PayMode/index?id=${router.params.id}&total=${router.params.total}`)
  }, [dataMap, defaultAddress, router.params, cart, userinfo])
  console.log(cart);

  return (
    <View className='pay'>
      <View className='pay-top'>
        <View className='pay-top-wenan'>订单配送至</View>
        <View className='pay-top-address'>{ defaultAddress && defaultAddress.address }</View>
        <View className='pay-top-user'>
        <Text>{ defaultAddress && defaultAddress.name }</Text>
          <Text style={{ marginLeft: '15rpx' }}>{ defaultAddress && defaultAddress.phone }</Text>
        </View>
        <View className='pay-top-time'>
          <View className='pay-top-time-dt'>
            <View>送达时间</View>
            <View style={{ color: '#4391fa' }}>尽快送达({ locationMap[router.params.id] && processDistanceTime(locationMap[router.params.id].duration)}分钟后送达)</View>
          </View>
          <View className='pay-top-time-mode'>
            <View>支付方式</View>
            <View style={{ color: '#4391fa' }}>微信支付</View>
          </View>
        </View>
        <View className='pay-top-info'>
          <View className='pay-top-info-business'>{ dataMap[router.params.id].business_name }</View>
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
      <View className='pay-bottom'>
          <View className='pay-bottom-left'>
            待支付 ¥{router.params.total}
          </View>
          <View className='pay-bottom-right' onClick={handleAccountClick}>提交订单</View>
      </View>
    </View>
  )
}

export default Pay
