import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Bill } from '@/components'
import { AtSwipeAction  } from 'taro-ui'
import { OrderModel } from '@/interfaces'
import './index.scss'
import { useAsyncFn, validate } from '@/common'
import { OrderApi } from '@/api'
import { useDispatch } from '@tarojs/redux'
import { getOrderList } from '@/store/actions'
import { useSelector } from '@/store'
const swiperAction: any = [
  {
    text: '删除',
    style: {
      background: 'red',
      color: '#fff'
    }
  }
]
interface IProps {
  list: OrderModel.Order[]
  noComment?: boolean
}
const BillList: Taro.FC<IProps> = ({ list, noComment }) => {
  const dispatch = useDispatch()
  const userinfo = useSelector(state => state.user.userinfo)
  const [state, fetch] = useAsyncFn(async (order) => {
    const res = await Taro.showModal({
      title: '删除',
      content: '确定删除该订单？',
      confirmColor: 'red'
    })
    if (res.confirm) {
      const ret = await OrderApi.deleteOrder(order.id)
      if (validate(ret)) {
        dispatch(getOrderList(userinfo.openid!))
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }, [userinfo], undefined, '', '')

  return (
    <View className='billlist'>
      {
        list && list.map(item => (!item.isComment && noComment) || (!noComment) ? (
          <AtSwipeAction options={swiperAction} onClick={() => fetch(item)}>
            <Bill data={item} noComment={noComment}/>
          </AtSwipeAction>
        ) : null)
      }
    </View>
  )
}

export default BillList
