import Taro, { useMemo, useCallback } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'
import { OrderModel, GoodsModel } from '@/interfaces'
import { useSelector } from '@/store'
import { processImage } from '@/common/util/process'
import { toPage } from '@/common'

interface IProps {
  data: OrderModel.Order
  noComment?: boolean
}
const Bill: Taro.FC<IProps> = ({ data, noComment }) => {
  const businessMap = useSelector(state => state.business.dataMap)
  const sum = useMemo(() => {
    if (data) {
      return (data.goods_list as GoodsModel.Goods[]).reduce((sm, item) => {
        return sm + (item.goods_discount * item.goods_price / 10) * data.goodsMap![item.goods_id]
      }, 0)
    }
  }, [data])

  const handleOrderClick = useCallback((status) => {
    if (status === 0 && sum) {
      toPage(`/pages/PayMode/index?total=${sum}&id=${data.business_id}&order_id=${data.id}`)
    } else if (status === 1) {
      toPage(`/pages/BusinessDetail/index?id=${data.business_id}`)
    }
  }, [data, sum])

  let goodsMap
  if (data) {
    goodsMap = (data.goods_list as GoodsModel.Goods[]).reduce((obj, e) => (obj[e.goods_id] = e, obj), {})
  }

  return data ? (
    <View>
      <View className='bill' onClick={() => toPage(`/pages/OrderDetail/index?id=${data.id}`)}>
        <View className='bill-top'>
          <View className='bill-top-wrap'>
            <Image className='bill-top-show' src={processImage(businessMap[data.business_id].business_image)}/>
            <View className='bill-top-name'>
              { businessMap[data.business_id].business_name } >
            </View>
          </View>
          <View className='bill-top-status'>
            { data.pay_status === 0 ? '未支付' : data.pay_status === 1 ? '已完成' : '已退款' }
          </View>
        </View>
        <View className='bill-good'>
          <ScrollView
            scrollX
            style={{
              whiteSpace: 'nowrap'
            }}
            scrollWithAnimation
          >
            {
              (data.goods_list as GoodsModel.Goods[]).map(value => {
                return (
                  <View className='bill-good-item'>
                    <View className='bill-good-item_show onlyone'>
                      <Image src={processImage(value.goods_image) || ''}/>
                      <View>{ value.goods_detail }</View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
          <View className='bill-good-price'>
            <View style={{ marginTop: '30rpx' }}>¥{ sum }</View>
          <View className='bill-good-price-count'>共{ data.goods_list.length }件</View>
          </View>
        </View>
        <View className='bill-btn'>
          {
            data && !data.isComment && noComment ? (
              <AtButton
                className='bill-btn-status'
                type='primary'
                size='small'
                onClick={() => toPage(`/pages/Assess/index?business_id=${data.business_id}&order_id=${data.id}`)}
                customStyle={{ marginRight: '20rpx' }}
              >
                去评价
              </AtButton>
            ) : null
          }
          <AtButton className='bill-btn-status' type='primary' size='small' onClick={() => handleOrderClick(data.pay_status)}>
            { data.pay_status === 0 ? '去支付' : data.pay_status === 1 ? `再来一单` : '' }
          </AtButton>
        </View>
      </View>
    </View>
  ) : null
}

export default Bill
