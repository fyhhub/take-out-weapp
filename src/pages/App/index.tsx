import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { Search } from '@/components'
import { useDispatch } from '@tarojs/redux'
import { useSelector } from '@/store'
import { getLocationAction, setLocation, getBusinessList } from '@/store/actions'
import { check, catchError } from '@/common'
import { CommonModel } from '@/interfaces'
import { ClTitleBar } from "mp-colorui"
import BusinessList from './components/BusinessList'
import swiper1 from '@/assets/images/swiper1.jpg'
import swiper2 from '@/assets/images/swiper2.jpg'
import locationImg from '@/assets/images/location.png'
import returnImg from '@/assets/images/return.png'

import 'mp-colorui/dist/style/components/titleBar.scss'
import './index.scss'
const App = () => {
  const [search, setSearch] = useState('')
  const [searchShow, setSearchShow] = useState(false)
  const dispatch = useDispatch()
  const address = useSelector(state => state.common.address)
  const list = useSelector(state => state.business.data)
  useEffect(() => {
    dispatch(getLocationAction())
    dispatch(getBusinessList())
  }, [])

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
    console.log(search);

  }, [search])
  return (
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
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg'/>
                <View>甜品饮品</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg'/>
                <View>商超便利</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg'/>
                <View>美食</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg'/>
                <View>简餐</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/a/fa/d41b04d520d445dc5de42dae9a384jpeg.jpeg'/>
                <View>新店特惠</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/3/84/8e031bf7b3c036b4ec19edff16e46jpeg.jpeg'/>
                <View>准时达</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg'/>
                <View>预定早餐</View>
              </View>
              <View className='app-content-grid_item'>
                <Image src='https://fuss10.elemecdn.com/e/7e/02b72b5e63c127d5bfae57b8e4ab1jpeg.jpeg'/>
                <View>土豪推荐</View>
              </View>
            </View>
            <ClTitleBar
              title='附近商家'
              type='border-title'
              textColor='black'
              borderColor='green'
              style={{ marginTop: '20rpx' }}
            />
            <View className='app-content-business'>
              {
                list.length > 0 ? <BusinessList list={list}/> : null
              }
            </View>
          </View>
        ) : null
      }
      <Search show={searchShow}/>
    </View>
  )
}

export default App
