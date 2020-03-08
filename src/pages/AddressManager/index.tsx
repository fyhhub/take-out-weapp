import Taro from "@tarojs/taro";
import { View, Text, Input, Switch, Button } from "@tarojs/components";
import "./index.scss";

const AddressManager = () => {
  return (
    <View className="content addressManager">
      <View className="row b-b">
        <Text className="tit">联系人</Text>
        <Input className="input" type="text" placeholder="收货人姓名" />
      </View>
      <View className="row b-b">
        <Text className="tit">手机号</Text>
        <Input className="input" type="number" placeholder="收货人手机号码" />
      </View>
      <View className="row b-b">
        <Text className="tit">地址</Text>
        <Text className="input">在地图选择</Text>
        <Text className="yticon icon-shouhuodizhi"></Text>
      </View>
      <View className="row b-b">
        <Text className="tit">补充说明</Text>
        <Input className="input" type="text" />
      </View>

      <View className="row default-row">
        <Text className="tit">设为默认</Text>
        <Switch />
      </View>
      <Button className="add-btn">提交</Button>
    </View>
  );
};

export default AddressManager;
