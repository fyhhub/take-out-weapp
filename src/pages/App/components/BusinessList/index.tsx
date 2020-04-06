import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Business } from '@/components'
import { BusinessModel } from '@/interfaces'
import './index.scss'
interface IProps {
  list: BusinessModel.Business[]
}
const BusinessList: Taro.FC<IProps> = ({ list=[] }) => {
  return (
    <View className='businesslist'>
      {
        list.map(item => {
          return <Business data={item}/>
        })
      }
    </View>
  )
}

export default BusinessList
