import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import { BusinessModel } from '@/interfaces'
import { useAsync, validate } from '@/common'
import { AssessApi } from '@/api'
import { formatDate } from '@/common/util/process'
import { Empty } from '@/components'
import './index.scss'

interface IProps {
  business: BusinessModel.Business
}
const Evaluate: Taro.FC<IProps> = ({ business }) => {
  const data = useAsync(async () => {
    const res = await AssessApi.list(business.business_id)
    if (validate(res)) {
      return {
        list: res.data.result.list,
        users: res.data.result.users.reduce((obj, item) => (obj[item.openid] = item, obj), {})
      }
    }
  }, [business])

  return (
    <View className='evaluate'>
      <View className='evaluate-top'>
        <View className='evaluate-top-score'>{ business.business_grade }</View>
        <View className='evaluate-top-stars'>
          <View style={{ marginBottom: '15rpx' }}>商家评分</View>
          <AtRate value={ business && business.business_grade } />
        </View>
      </View>
      <View style={{ height: '15rpx', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></View>
      {
        data.value && data.value.list.length === 0 ? (
          <Empty title='暂无评论' style={{ paddingTop: '40rpx' }}/>
        ) : null
      }
      {
        data.value && data.value.list.map(item => {
          const busReply = data.value && data.value.list.find(e => {
            return e.parent_id === item.evaluate_id
          })
          const reply = (
            <View className='evaluate-comments-content-reply'>
              商家回复：{ busReply && busReply.evaluate_content }
            </View>
          )
          return !item.parent_id ? (
            <View className='evaluate-comments'>
              <View className='evaluate-comments-avatar'>
                <Image src={data.value && data.value.users[item.openid].avatarUrl}/>
              </View>
              <View className='evaluate-comments-content'>
                <View className='evaluate-comments-content-info'>
                  <Text style={{ fontSize: '25rpx' }} className='evaluate-comments-content-info-name'>{(data.value && data.value.users[item.openid].nickName) || '匿名用户'}</Text>
                  <Text className='evaluate-comments-content-info-time'>{formatDate(item.evaluate_time)}</Text>
                </View>
                <View className='evaluate-comments-content-star'>
                  <Text style={{ fontSize: '25rpx', color: '#999', marginRight: '15rpx' }}>评价</Text> <AtRate size={10} value={item.evaluate_score}/>
                </View>
                <View className='evaluate-comments-content-main'>
                  { item.evaluate_content || '该用户未评价' }
                </View>
                { busReply && reply }
              </View>
            </View>
          ) : null
        })
      }
    </View>
  )
}

export default Evaluate
