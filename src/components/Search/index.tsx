import Taro, { FC, useCallback, useEffect, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Empty } from '@/components'
import deleteImg from '@/assets/images/delete.png'
import './index.scss'
interface IProps {
  show?: boolean
  onChange?: Function
}
const Search: FC<IProps> = ({ show, onChange }) => {
  const [searchHistory, setSearchHistory] = useState([])
  const handleSelectClick = useCallback((val) => {
    onChange && onChange(val)
  }, [onChange])
  useEffect(() => {
    if (show) {
      let history = Taro.getStorageSync('searchHistory')
      history = JSON.parse(history)
      setSearchHistory(history)
    }
  }, [show])
  return (
    <View className='search' style={{ display: show ? 'block' : 'none', pointerEvents: show ? 'initial' : 'none' }}>
      <View className='search-content'>
        <View className='search-content-title'>
          <View>历史搜索</View>
          <View><Image src={deleteImg} className='iconImg' onClick={() => {
            Taro.removeStorageSync('searchHistory')
            setSearchHistory([])
          }}/></View>
        </View>
        <View className='search-content-options'>
          {
            searchHistory.map(item => (
              <View className='search-content-options_item' onClick={() => handleSelectClick(item)}>{item}</View>
            ))
          }
          {
            searchHistory.length === 0 ? (
              <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                 <Empty title='暂无搜索历史' style={{ paddingTop: '40rpx' }}/>
              </View>
            ) : null
          }
        </View>
      </View>
    </View>
  )
}


export default Search
