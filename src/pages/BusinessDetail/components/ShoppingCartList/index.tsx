import Taro, { useCallback, useMemo } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { useSelector } from '@/store'
import { setCartListShow, clearCart } from '@/store/actions'
import ShoppingCartItem from '../ShoppingCartItem'
import { GoodsModel } from '@/interfaces'
import './index.scss'

interface IProps {
}
const ShoppingCartList: Taro.FC<IProps> = () => {
  const dispatch = useDispatch()
  const cartListShow = useSelector(state => state.cart.cartListShow)
  const cart = useSelector(state => state.cart.cart)
  const goodsListMap = useSelector(state => state.goods.list)

  const goodsNum = Object.keys(cart).length
  const handleClearCartClick = useCallback(() => {
    dispatch(clearCart())
    dispatch(setCartListShow(false))
  }, [cart])

  return (
    <AtFloatLayout isOpened={cartListShow} onClose={() => dispatch(setCartListShow(false))}>
      <View className='shopping-cartlist'>
        <View className='shopping-cartlist-num'>
          <View className='shopping-cartlist-num-left'>
            共{ goodsNum }件商品
          </View>
          <View className='shopping-cartlist-num-right' onClick={handleClearCartClick}>
            清空
          </View>
        </View>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
        >
          {
            Object.keys(cart).map(goods_id => {
              return goodsListMap[goods_id] != null && cart[goods_id] > 0 ?
                <ShoppingCartItem goods_id={goods_id} amount={cart[goods_id]} goods={goodsListMap[goods_id]}/>: null
            })
          }
        </ScrollView>
      </View>
    </AtFloatLayout>
  )
}

export default ShoppingCartList
