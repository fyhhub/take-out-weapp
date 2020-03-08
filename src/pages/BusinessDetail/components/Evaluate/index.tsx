import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtRate } from 'taro-ui'
import swiper2 from '@/assets/images/swiper2.jpg'
import { BusinessModel } from '@/interfaces'
import './index.scss'

interface IProps {
  business: BusinessModel.Business
}
const Evaluate: Taro.FC<IProps> = ({ business }) => {
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
      <View className='evaluate-comments'>
        <View className='evaluate-comments-avatar'>
          <Image src={swiper2}/>
        </View>
        <View className='evaluate-comments-content'>
          <View className='evaluate-comments-content-info'>
            <Text className='evaluate-comments-content-info-name'>3******3</Text>
            <Text className='evaluate-comments-content-info-time'>2020-02-28</Text>
          </View>
          <View className='evaluate-comments-content-star'>
            ★★★★★
          </View>
          <View className='evaluate-comments-content-main'>
            这个时间还能吃到火锅 很棒
            这个时间还能吃到火锅 很棒
            这个时间还能吃到火锅 很棒
            这个时间还能吃到火锅 很棒
            这个时间还能吃到火锅 很棒
            这个时间还能吃到火锅 很棒
          </View>
          <View className='evaluate-comments-content-reply'>
            商家恢复：么么哒
          </View>
        </View>
      </View>
    </View>
  )
}

export default Evaluate
