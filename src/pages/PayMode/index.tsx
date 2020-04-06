import Taro, { useState, useCallback, useRouter } from "@tarojs/taro";
import { View, Text, Label, Radio, Image } from "@tarojs/components";
import alipay from '@/assets/images/alipay.png'
import wechat from '@/assets/images/wechat.png'
import "./index.scss";
import { OrderApi } from "@/api";
import { useSelector } from "@/store";
import { useAsyncFn } from "@/common";
import { useDispatch } from "@tarojs/redux";
import { getOrderList } from "@/store/actions";

const PayMode = () => {
  const [mode, setMode] = useState(0)
  const current = useSelector(state => state.order.current)
  const userinfo = useSelector(state => state.user.userinfo)
  const router = useRouter()
  const dispatch = useDispatch()
  const [state, fetch] = useAsyncFn(async () => {
    const id = +router.params.order_id || current
    const res = await OrderApi.pay(id)
    return res
  }, [router.params, current, userinfo], undefined, '正在支付', '支付成功', () => {
    Taro.switchTab({ url: '/pages/Order/index' })
    dispatch(getOrderList(userinfo.openid!))
  })
  return (
    <View className="paymode">
      <View className="price-box">
        <Text>支付金额</Text>
        <Text className="price">{router.params.total}</Text>
      </View>
      <View className="pay-type-list">
        <View className="type-item b-b">
          <Image src={wechat} style={{ width: '100rpx', height: '100rpx' }}/>
          <View className="con">
            <Text className="tit">微信支付</Text>
            <Text>推荐使用微信支付</Text>
          </View>
          <Label className="Radio">
            <Radio checked={mode === 0} value='' color="#fa436a" onClick={() => setMode(0)}/>
          </Label>
        </View>
        <View className="type-item b-b">
          <Image src={alipay} style={{ width: '100rpx', height: '100rpx' }}/>
          <View className="con">
            <Text className="tit">支付宝支付</Text>
          </View>
          <Label className="Radio">
            <Radio checked={mode === 1} value='' color="#fa436a" onClick={() => setMode(1)}/>
          </Label>
        </View>
      </View>
      <Text className="mix-btn" onClick={fetch}>确认支付</Text>
    </View>
  );
};

export default PayMode;
