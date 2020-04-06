import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Empty } from '@/components'
import BusinessList from '@/pages/App/components/BusinessList'
import { useAsync } from '@/common'
import { BusinessApi } from '@/api'
import './index.scss'

const SearchList = () => {
  const router = useRouter()
  const state = useAsync(async () => {
    const res = await BusinessApi.search(router.params, !!router.params.name ? 'name' : 'category')
    return res
  }, [router])
  return (
    <View className='searchlist'>
      <BusinessList list={state.value && state.value.data.result}/>
      {
        state.value && state.value.data.result.length ? null : <Empty title='没有找到哦~' style={{ paddingTop: '40rpx', height: '100vh' }}/>
      }
    </View>
  )
}

export default SearchList
