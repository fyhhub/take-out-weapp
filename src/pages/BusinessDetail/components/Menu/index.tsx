import Taro, { useState, FC, useEffect, memo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { GoodsModel } from '@/interfaces'
import MenuItem from '../MenuItem'
import { useDispatch } from '@tarojs/redux'
import { setGoodsList } from '@/store/actions'
import './index.scss'

interface IProps {
  data: GoodsModel.Goods[]
}
const Menu: FC<IProps> = ({ data }) => {
  const [current, setCurrent] = useState(0)
  const [tabList, setTabList] = useState<{ title: string }[]>([
    // { title: '热卖' },
    // { title: '折扣' }
  ])
  const [list, setList] = useState<GoodsModel.Goods[]>([])
  const dispatch = useDispatch()
  useEffect(() =>{
    const types = [...new Set(data.map(e => e.goods_type))].map(title => ({ title }))
    setTabList(state => state.concat(types))
    setList(data)
    dispatch(setGoodsList(data.reduce((obj, e) => (obj[e.goods_id] = e, obj), {})))
  }, [data])
  return (
    <View className='business-detail-menu'>
      <AtTabs
        current={current}
        scroll
        tabDirection='vertical'
        height='100%'
        tabList={tabList}
        onClick={setCurrent}
      >
        {
          tabList.map(tab => {
            const List = list.filter(e => e.goods_type === tab.title)
            return (
              <AtTabsPane tabDirection='vertical' current={current} index={0}>
                {
                  List.map(item => <MenuItem data={item} key={item.goods_id}/>)
                }
                <View style={{ height: '80rpx' }}></View>
              </AtTabsPane>
            )
          })
        }
      </AtTabs>
    </View>
  )
}

export default memo(Menu)
