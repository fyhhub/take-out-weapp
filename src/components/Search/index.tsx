import Taro, { FC } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import reloadImg from '@/assets/images/reload.png'
import deleteImg from '@/assets/images/delete.png'
import './index.scss'
interface IProps {
  show?: boolean
}
const Search: FC<IProps> = ({ show }) => {
  return (
    <View className='search' style={{ display: show ? 'block' : 'none', pointerEvents: show ? 'initial' : 'none' }}>
      <View className='search-content'>
        <View className='search-content-title'>
          <View>搜索发现</View>
          <View>换一批<Image src={reloadImg} className='iconImg'/></View>
        </View>
        <View className='search-content-options'>
          <View className='search-content-options_item'>酸菜鱼</View>
          <View className='search-content-options_item'>煲仔饭</View>
          <View className='search-content-options_item'>麦当劳</View>
          <View className='search-content-options_item'>炸鸡</View>
          <View className='search-content-options_item'>华莱士</View>
          <View className='search-content-options_item'>汤</View>
          <View className='search-content-options_item'>肯德基</View>
          <View className='search-content-options_item'>良品铺子</View>
          <View className='search-content-options_item'>桥头排骨</View>
          <View className='search-content-options_item'>黄焖鸡米饭</View>
          <View className='search-content-options_item'>粥</View>
        </View>
      </View>
      <View className='search-content'>
        <View className='search-content-title'>
          <View>历史搜索</View>
          <View><Image src={deleteImg} className='iconImg'/></View>
        </View>
        <View className='search-content-options'>
          <View className='search-content-options_item'>酸菜鱼</View>
          <View className='search-content-options_item'>煲仔饭</View>
          <View className='search-content-options_item'>麦当劳</View>
          <View className='search-content-options_item'>炸鸡</View>
          <View className='search-content-options_item'>华莱士</View>
          <View className='search-content-options_item'>汤</View>
          <View className='search-content-options_item'>肯德基</View>
          <View className='search-content-options_item'>良品铺子</View>
          <View className='search-content-options_item'>桥头排骨</View>
          <View className='search-content-options_item'>黄焖鸡米饭</View>
          <View className='search-content-options_item'>粥</View>
        </View>
      </View>
    </View>
  )
}


export default Search
