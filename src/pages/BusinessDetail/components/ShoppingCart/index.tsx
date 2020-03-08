import Taro, { useMemo, useRouter } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import shopping2 from '@/assets/images/shopping2.png'
import shopping1 from '@/assets/images/shopping1.png'
import { useDispatch } from '@tarojs/redux'
import { useSelector } from '@/store'
import { setCartListShow } from '@/store/actions'
import { AtBadge } from 'taro-ui'
import { BusinessModel } from '@/interfaces'
import './index.scss'
interface IProps {
  business: BusinessModel.Business
}
const ShoppingCart: Taro.FC<IProps> = ({ business }) => {
  const dispatch = useDispatch()
  const cartListShow = useSelector(state => state.cart.cartListShow)
  const cart = useSelector(state => state.cart.cart)
  const list = useSelector(state => state.goods.list)

  const selectNum = useMemo(() => {
    return Object.values(cart).filter(Boolean).reduce((a, b) => a + b, 0)
  }, [cart])
  const prices = useMemo(() => {
    let sum = 0
    let disCountSum = 0
    Object.keys(cart).forEach(k => {
      const goods_price = list[k].goods_price
      const goods_discount = list[k].goods_discount
      sum += goods_price * cart[k]
      disCountSum += (goods_price * goods_discount / 10) * cart[k]
    })
   return [sum, disCountSum]
  }, [cart])

  return (
    <View className='shoppingcart'>
      <View className='shoppingcart-left' onClick={() => {
        if (selectNum === 0) return
        dispatch(setCartListShow(!cartListShow))
      }}>
        {
          selectNum > 0 ? (
            <AtBadge value={selectNum}>
              <Image src={shopping1}/>
            </AtBadge>
          ) : <Image src={shopping2}/>
        }
        {
          selectNum > 0 ? (
            <View className='shoppingcart-left-select'>
              <View style={{ fontSize: '35rpx', fontWeight: 500 }}>
                ¥{ prices[1] }<Text style={{ fontSize:'28rpx', marginLeft: '10rpx', color: '#999', textDecoration: 'line-through' }}>¥{prices[0]}</Text>
              </View>
              <View style={{ fontSize: '20rpx', color: '#999'}}>另需配送费{ business.business_df }元</View>
            </View>
          ) : (
            <View className='shoppingcart-left-noselect'>
              <View style={{ fontSize: '30rpx', fontWeight: 500 }}>未选购商品</View>
              <View style={{ fontSize: '20rpx'}}>另需配送费{ business.business_df }元</View>
            </View>
          )
        }
      </View>
      <View className='shoppingcart-right'>
        {
          selectNum > 0 && prices[0] >= business.business_sd ?
            <View className='shoppingcart-right-sum' onClick={() => Taro.navigateTo({ url: `/pages/Pay/index?business_id=${business.business_id}` })}>去结算</View> :
            <View className='shoppingcart-right-account'>差¥{ business.business_sd - prices[0] }起送</View>
        }
      </View>
    </View>
  )
}

export default ShoppingCart
