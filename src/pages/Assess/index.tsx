import Taro, { useRouter, useEffect, useState, useCallback } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from '@/store'
import { processImage } from '@/common/util/process'
import { BusinessModel } from '@/interfaces'
import { useInitByRouter, useAsyncFn, validate } from '@/common'
import { AtRate, AtTag, AtTextarea, AtButton } from 'taro-ui'
import './index.scss'
import { AssessApi } from '@/api'
import { useDispatch } from '@tarojs/redux'
import { getOrderList } from '@/store/actions'


const comments = [
  '食材新鲜', '清淡不油腻', '包装精美', '分量足', '商家服务好', '物美价廉'
]
const Assess = () => {
  const router = useRouter()
  const userinfo = useSelector(state => state.user.userinfo)
  const dataMap = useSelector(state => state.business.dataMap)
  const business = useInitByRouter<BusinessModel.Business>(dataMap[router.params.business_id])
  const [rate, setRate] = useState(5)
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const [state, handleSubmit] = useAsyncFn(async () => {
    const form = {
      evaluate_content: text,
      evaluate_time: Date.now() + '',
      evaluate_score: rate,
      openid: userinfo.openid,
      business_id: router.params.business_id,
      order_id: router.params.order_id
    }
    const res = await AssessApi.create(form)
    if (validate(res)) {
      dispatch(getOrderList(userinfo.openid!))
    }
  }, [rate, text, userinfo, router.params], undefined, '正在提交...', '评价成功', () => {
    Taro.navigateBack()
  })
  return (
    <View className='assess'>
      <View className='assess-business'>
        <Image src={business && processImage(business.business_image)}/>
        <View>{ business && business.business_name }</View>
      </View>
      <View className='assess-rate'>
        <AtRate size={30} value={rate} onChange={(val: any) => setRate(val)}/>
      </View>
      {/* <View className='assess-com'>
        {
          comments.map(c => (
            <AtTag
              name={c}
              type='primary'
              circle
            >
              {c}
            </AtTag>
          ))
        }
      </View> */}
      <View className='assess-text'>
        <AtTextarea
          maxLength={200}
          value={text}
          onChange={(e) => setText((e.target as any).value)}
          placeholder='写下您对商家的评价吧~'
        />
      </View>
      <AtButton type='primary' className='assess-submit' onClick={handleSubmit}>提交</AtButton>
    </View>
  )
}

export default Assess
