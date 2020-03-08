import Taro, { useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import starImg from '@/assets/images/star.png'
import { BusinessModel } from '@/interfaces'
import { processImage, processMetre, processDistanceTime } from '@/common/util/process'
import { useSelector } from '@/store'
import './index.scss'

interface IProps {
  data: BusinessModel.Business
}
const Business = ({ data }: IProps) => {
  const locationMap = useSelector(state => state.business.locationMap)

  return data && locationMap[data.business_id].distance < 10 * 1000 ? (
    <View className='business' onClick={() => Taro.navigateTo({ url: `/pages/BusinessDetail/index?id=${data.business_id}` })}>
      <View className='business-left'>
        <Image src={processImage((data && data.business_image) || '')}/>
      </View>
      <View className='business-right'>
        <View className='business-right-title'>{data.business_name}</View>
        <View className='business-right-info'>
          <View>
            <View><Image src={starImg} className='iconImg'/>{data.business_grade}</View>
            <Text>月售{data.business_sale}</Text>
          </View>
          <View>
            <Text>{ processDistanceTime(locationMap[data.business_id].duration) }</Text>
            <Text>{ processMetre(locationMap[data.business_id].distance) }</Text>
          </View>
        </View>
        <View className='business-right-price'>
          <View className='business-right-price_item'>
            起送 ¥20
          </View>
          <View className='business-right-price_item'>
            免配送费
          </View>
          <View className='business-right-price_item'>
            人均 ¥17
          </View>
        </View>
        <View className='business-right-tag'>
          <View>"味道很好，还送了火腿肠"</View>
          <View>点分高分店铺</View>
        </View>
      </View>
    </View>
  ) : null
}

export default Business
