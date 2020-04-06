import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Card } from '@/components'
import './index.scss'
import { useSelector } from '@/store'
import { formatDate } from '@/common/util/process'

const OrderDetail = () => {
  const router = useRouter()
  const orders = useSelector(state => state.order.list)
  const { address, name, time } = orders.find(e => e.id === +router.params.id)! || {}

  return (
    <View className='orderdetail'>
      <Card title='配送信息' items={[
        { key: '送达时间', value: '尽快送达' },
        { key: '收获地址', value: [address, name] },
        { key: '配送方式', value: '商家配送' },
      ]}/>
      <Card style={{ marginTop:'20rpx' }} title='订单信息' items={[
        { key: '订单号', value: router.params.id },
        { key: '支付方式', value: '在线支付' },
        { key: '下单时间', value: formatDate(time) },
      ]}/>
    </View>
  )
}

export default OrderDetail
