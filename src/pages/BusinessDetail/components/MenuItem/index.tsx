import Taro, { memo, useCallback, useState } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import addImg from '@/assets/images/add.png'
import divideImg from '@/assets/images/divide.png'
import { GoodsModel } from '@/interfaces'
import { useSelector } from '@/store'
import { setCartItem } from '@/store/actions'
import { useDispatch } from '@tarojs/redux'
import { InputNumber } from '@/components'
import './index.scss'

interface IProps {
  data: GoodsModel.Goods
}

const MenuItem: Taro.FC<IProps> = ({ data }) => {
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
  const { goods_image='', goods_detail='', goods_discount, goods_price, goods_id, goods_sale, goods_name } = data || {}

  const handleAddGoodsClick = useCallback(() => {
    const num = cart[goods_id] || 0
    dispatch(setCartItem({ [goods_id]: num + 1 }))
  }, [cart, goods_id])

  const handleReduceGoodsClick = useCallback(() => {
    const num = cart[goods_id] || 0
    if (num === 0) {
      return
    }
    dispatch(setCartItem({ [goods_id]: num - 1 }))
  }, [cart, goods_id])
  return (
    <View className='menuitem'>
      <View className='menuitem-container'>
        <View className='menuitem-left'>
          <Image src={goods_image === ',' ? '' : goods_image.slice(0, goods_image.indexOf(','))} mode='aspectFill'/>
        </View>
        <View className='menuitem-right'>
          <View className='menuitem-right-title'>{ goods_name }</View>
          <View className='menuitem-right-detail'>
            {
              goods_detail.split('+').map(item => {
                return <AtTag name={item} type='primary' size='small' customStyle={{ marginRight: '15rpx' }}>{ item }</AtTag>
              })
            }
          </View>
          <View className='menuitem-right-sale'>月售{ goods_sale }</View>
          <View className='menuitem-right-price'>
            <View className='menuitem-right-price-p'>
              <Text style={{ fontSize: '13px', color: 'red' }}>¥</Text><Text style={{ fontSize: '18px', color: 'red' }}>{ goods_price * (goods_discount / 10) }</Text>
              {
                goods_discount < 10 ?
                  <Text
                    style={{
                      fontSize: '13px',
                      color: '#666',
                      textDecoration: 'line-through',
                      marginLeft: '10px'
                    }}>
                    ¥{ goods_price }
                  </Text> : null
              }
              {
                goods_discount < 10 ? <View style={{ fontSize: '13px', color: 'red' }}>{ goods_discount }折</View> : null
              }
            </View>
            <InputNumber
              amount={cart[goods_id] || 0}
              onLeftClick={handleReduceGoodsClick}
              onRightClick={handleAddGoodsClick}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default MenuItem
