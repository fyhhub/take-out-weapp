import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ReactNode, CSSProperties } from 'react'
import './index.scss'
interface IProps {
  items?: { key: string, value: string[] | string | ReactNode }[]
  title: string
  className?: string
  style?: CSSProperties
}
const Card: Taro.FC<IProps> = ({ title, items=[], className='', style }) => {
  return (
    <View className={`${className} mcard`} style={style}>
      <View className='mcard-title'>{ title }</View>
      {
        items.map(item => {
          const type = Object.prototype.toString.call(item.value)
          return (
            <View className='mcard-item'>
              <View className='mcard-item-key'>{item.key}</View>
              <View className='mcard-item-value'>
                {
                  type === '[object String]' ? <View>{item.value}</View> : null
                }
                {
                  type === '[object Array]' ? (item.value as string[]).map(e => <View>{e}</View>) : null
                }
                {
                  type === '[object Object]' ? <View>{item.value}</View> : null
                }
              </View>
            </View>
          )
        })
      }
    </View>
  )
}

export default Card
