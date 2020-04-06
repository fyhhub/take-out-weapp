import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import empty1 from '@/assets/images/empty1.png'
import { CSSProperties } from 'react'
import './index.scss'
interface IProps {
  title?: string
  style?: CSSProperties
}
const Empty: Taro.FC<IProps> = ({ title, style }) => {
  return (
    <View className='empty' style={style}>
      <Image src={empty1}/>
      <View>{title || '暂无内容'}</View>
    </View>
  )
}

export default Empty
