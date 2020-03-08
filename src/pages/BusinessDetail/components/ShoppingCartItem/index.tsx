import Taro, { memo, useCallback } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { InputNumber } from '@/components'
import { useDispatch } from '@tarojs/redux'
import { useSelector } from '@/store'
import { setCartItem } from '@/store/actions'
import { GoodsModel } from '@/interfaces'
import './index.scss'
interface IProps {
  amount: number
  goods: GoodsModel.Goods
  goods_id: string
}
const ShoppingCartItem: Taro.FC<IProps> = ({ amount, goods, goods_id }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)

  const handleAddGoodsClick = useCallback(() => {
    const num = cart[goods.goods_id] || 0
    dispatch(setCartItem({ [goods.goods_id]: num + 1 }))
  }, [cart, goods_id])

  const handleReduceGoodsClick = useCallback(() => {

    const num = cart[goods.goods_id] || 0
    console.log('num: ', num);
    if (num === 0) {
      return
    }
    dispatch(setCartItem({ [goods.goods_id]: num - 1 }))
  }, [cart, goods_id])
  return (
    <View className='cart-item'>
      <View className='cart-item-name'>{ goods.goods_name }</View>
      <View className='cart-item-priceAndnum'>
        {
          amount > 0 ? (
            <View className='cart-item-priceAndnum-price'>
              <Text style={{ fontSize: '20rpx' }}>¥</Text>{ goods.goods_price * (goods.goods_discount / 10) * amount }
            </View>
          ) : null
        }
        <View className='cart-item-priceAndnum-num'>
          <InputNumber
            amount={amount || 0}
            onLeftClick={handleReduceGoodsClick}
            onRightClick={handleAddGoodsClick}
          />
        </View>
      </View>
    </View>
  )
}

export default memo(ShoppingCartItem)
