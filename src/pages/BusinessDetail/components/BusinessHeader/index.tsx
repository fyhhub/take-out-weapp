import Taro, { useRouter } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import swiper2 from '@/assets/images/swiper2.jpg'
import { BusinessModel } from '@/interfaces'
import { processDistanceTime, processImage } from '@/common/util/process'
import { useSelector } from '@/store'
import './index.scss'
interface IProps {
  data: BusinessModel.Business
}
const BusinessHeader: Taro.FC<IProps> = ({ data }) => {
  const locationMap = useSelector(state => state.business.locationMap)

  return (
    <View className='business-header'>
      <Image src={data && processImage(data.business_image)}/>
      <View className='business-header-name'>{ data.business_name }</View>
      <View className='business-header-info'>
        <View>评价{ ' ' + data.business_grade }</View>
        <View style={{ margin: '0 20rpx' }}>月售{ data.business_sale }</View>
        <View>商家配送约{ data && processDistanceTime(locationMap[data.business_id].duration) }</View>
      </View>
      <View className='business-header-notice'>
        公告：{ data.business_introduce || '欢迎光临' }
      </View>
    </View>
  )
}

export default BusinessHeader
