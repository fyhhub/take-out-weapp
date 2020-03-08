import Taro, { useCallback, useEffect } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { BusinessModel } from '@/interfaces'
import { processSomeImages } from '@/common/util/process'
import './index.scss'
interface IProps {
  business: BusinessModel.Business
}
const BusinessInfo: Taro.FC<IProps> = ({ business }) => {
  const handleClick = useCallback((title) => {
    Taro.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  }, [business])
  return business ? (
    <View className='business-info'>
      <View className='business-info-info'>
        <View className='business-info-info-title'>商家信息</View>
        <ScrollView
          className='scrollview'
          scrollX
          scrollWithAnimation
        >
          {
            processSomeImages(business.business_image).map(src => <Image src={src}/>)
          }
        </ScrollView>
      </View>
      <View style={{ height: '15rpx', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}></View>
      <AtList>
        <AtListItem title='商家名称' onClick={() => handleClick(business.business_name)} extraText={ business.business_name } />
        <AtListItem title='商家品类' onClick={() => handleClick(business.business_name)} extraText='烧烤' />
        <AtListItem title='商家地址' onClick={() => handleClick(business.business_address)} extraText={ business.business_address } />
        <AtListItem title='商家电话' onClick={() => handleClick(business.business_phone)} extraText={ business.business_phone } />
        <AtListItem title='营业时间' onClick={() => handleClick(business.business_servetime)} extraText={ business.business_servetime } />
      </AtList>
    </View>
  ) : null
}
export default BusinessInfo
