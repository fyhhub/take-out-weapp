import Taro, { useState, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtActivityIndicator  } from 'taro-ui'
import { useSelector } from '@/store'
import { useDispatch } from '@tarojs/redux'
import { useAsync, validate } from '@/common'
import { GoodsApi } from '@/api'
import { Spin } from '@/components'
import Menu from './components/Menu'
import Evaluate from './components/Evaluate'
import BusinessHeader from './components/BusinessHeader'
import ShoppingCart from './components/ShoppingCart'
import ShoppingCartList from './components/ShoppingCartList'
import BusinessInfo from './components/BusinessInfo'
import { clearCart } from '@/store/actions'
import 'mp-colorui/dist/style/components/loading.scss'
import './index.scss'
const tabList = [{ title: '点菜' }, { title: '评价' }, { title: '商家' }]
const BusinessDetail = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const router = useRouter()
  const dispatch = useDispatch()
  const dataMap = useSelector(state => state.business.dataMap)
  const goods = useAsync(async () => {
    dispatch(clearCart())
    const res = await GoodsApi.list({ business_id: router.params.id })
    validate(res)
    return res.data.result
  }, [router.params.id])
  const business = dataMap[router.params.id]


  return goods.loading ? (
    <AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator>
  ) : (
    <View className='business-detail'>
      <BusinessHeader data={business}/>
      <AtTabs className='business-detail-line' current={currentTab} tabList={tabList} onClick={setCurrentTab}>
        <AtTabsPane current={currentTab} index={0} >
          <Menu data={goods.value || []}/>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <Evaluate business={business}/>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={2}>
          <BusinessInfo business={business}/>
        </AtTabsPane>
      </AtTabs>
      {
        currentTab === 0 ? <ShoppingCart business={business}/> : null
      }
      <ShoppingCartList/>
    </View>
  )
}

export default BusinessDetail
