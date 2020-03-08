import Taro from "@tarojs/taro";
import { View, Text, Label, Radio, Image } from "@tarojs/components";
import alipay from '@/assets/images/alipay.png'
import wechat from '@/assets/images/wechat.png'
import "./index.scss";

const PayMode = () => {
  return (
    <View className="paymode">
      <View className="price-box">
        <Text>支付金额</Text>
        <Text className="price">38.88</Text>
      </View>
      <View className="pay-type-list">
        <View className="type-item b-b">
          <Image src={wechat} style={{ width: '100rpx', height: '100rpx' }}/>
          <View className="con">
            <Text className="tit">微信支付</Text>
            <Text>推荐使用微信支付</Text>
          </View>
          <Label className="Radio">
            <Radio value="" color="#fa436a" />
          </Label>
        </View>
        <View className="type-item b-b">
          <Image src={alipay} style={{ width: '100rpx', height: '100rpx' }}/>
          <View className="con">
            <Text className="tit">支付宝支付</Text>
          </View>
          <Label className="Radio">
            <Radio value="" color="#fa436a" />
          </Label>
        </View>
      </View>
      <Text className="mix-btn">确认支付</Text>
    </View>
  );
};

export default PayMode;
