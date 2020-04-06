import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtSearchBar, AtActivityIndicator } from 'taro-ui'
import { Search } from '@/components'
import { useDispatch } from '@tarojs/redux'
import { useSelector } from '@/store'
import { getLocationAction, setLocation, getBusinessList } from '@/store/actions'
import { check, catchError, useAuth } from '@/common'
import { CommonModel } from '@/interfaces'
import { ClTitleBar } from "mp-colorui"
import BusinessList from './components/BusinessList'
import swiper1 from '@/assets/images/swiper1.jpg'
import swiper2 from '@/assets/images/swiper2.jpg'
import locationImg from '@/assets/images/location.png'
import returnImg from '@/assets/images/return.png'
import 'mp-colorui/dist/style/components/titleBar.scss'
import { category } from '@/common/util/constants'
import './index.scss'

const App = () => {
  useAuth()
  const [search, setSearch] = useState('')
  const [searchShow, setSearchShow] = useState(false)
  const dispatch = useDispatch()
  const address = useSelector(state => state.common.address)
  const list = useSelector(state => state.business.data)
  const pending = useSelector(state => state.business.pending)
  const defaultAddress = useSelector(state => state.address.default)
  useEffect(() => {
    if (defaultAddress) {
      dispatch(getLocationAction())
      dispatch(getBusinessList())
    }
  }, [defaultAddress])

  const chooseAddress = useCallback(async () => {
    try {
      const res = await Taro.chooseLocation()
      dispatch(setLocation({
        address: res.address,
        latitude: res.latitude,
        longitude: res.longitude
      } as CommonModel.ILocation))
      check(res)
    } catch(e) {
      catchError(e)
    }
  }, [])

  const handleSearchClick = useCallback(() => {
    if (!search.trim()) return;
    let searchHistory = Taro.getStorageSync('searchHistory')
    if (searchHistory) {
      searchHistory = JSON.parse(searchHistory)
      if (!searchHistory.includes(search)) {
        Taro.setStorageSync('searchHistory', JSON.stringify(searchHistory.concat(search)))
      }
    } else {
      Taro.setStorageSync('searchHistory', JSON.stringify([search]))
    }
    Taro.navigateTo({
      url: `/pages/SearchList/index?name=${search}`
    })
  }, [search])

  const handleSearchChange = useCallback((val) => {
    setSearch(val)
  }, [])

  const handleCategoryClick = useCallback((id) => {
    Taro.navigateTo({
      url: `/pages/SearchList/index?category=${id}`
    })
  }, [])

  return pending || !address ? (
    <AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator>
  ) : (
    <View className='app'>
      {
        !searchShow ? <View onClick={chooseAddress} className='app-location'><Image src={locationImg} className='iconImg'/><Text>{address.address}</Text></View> : null
      }
      {
        searchShow ? <View className='app-return' onClick={() => {setSearchShow(false);setSearch('')}}>
          <Image className='iconImg' src={returnImg}/>返回
        </View> : null
      }
      <AtSearchBar
        actionName='搜索'
        focus={true && searchShow}
        value={search}
        onChange={(val) => setSearch(val)}
        showActionButton={searchShow}
        onFocus={() => setSearchShow(true)}
        onActionClick={handleSearchClick}
      />
      {
        !searchShow ? (
          <View className='app-content'>
            <Swiper
              className='app-content-swiper'
              indicatorColor='#ccc'
              indicatorActiveColor='#fff'
              circular
              indicatorDots
              autoplay
            >
              <SwiperItem>
                <Image src={swiper1} />
              </SwiperItem>
              <SwiperItem>
                <Image src={swiper2}/>
              </SwiperItem>
            </Swiper>

            <View className='app-content-grid'>
              {
                category.map(c => (
                  <View className='app-content-grid_item' onClick={() => handleCategoryClick(c.id)}>
                    <Image src={c.img}/>
                    <View>{c.name}</View>
                  </View>
                ))
              }
            </View>
            <ClTitleBar
              title='附近商家'
              type='border-title'
              textColor='black'
              borderColor='green'
              style={{ marginTop: '20rpx' }}
            />
            <View className='app-content-business'>
              <BusinessList list={list}/>
            </View>
          </View>
        ) : null
      }
      <Search show={searchShow} onChange={handleSearchChange}/>
    </View>
  )
}

export default App
