import Taro, { useEffect } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import { useSelector } from "@/store";
import "./index.scss";
import { AtList, AtListItem } from "taro-ui";

const My = () => {
  const userinfo = useSelector(state => state.user.userinfo);
  const toPage = (url) => {
    Taro.navigateTo({ url })
  }
  return (
    <View className="my">
      <View className="my-info">
        <View
          className="my-info-nologin"
          onClick={() => {
            userinfo.openid || toPage('/pages/Auth/index')
          }}
        >
          <View className="my-info-nologin-left">
            {userinfo.nickName || "立即登录"}
            {userinfo.nickName ? null : (
              <View
                className="at-icon at-icon-chevron-right"
                style={{ fontSize: "30rpx", color: "#999" }}
              ></View>
            )}
            <View
              style={{
                color: "#999",
                fontSize: "30rpx",
                marginTop: "20rpx",
                fontWeight: "normal"
              }}
            >
              再忙，也要记得吃饭呦~
            </View>
          </View>
          <View className="my-info-nologin-right">
            <Image src={userinfo.avatarUrl || ""} />
          </View>
        </View>
        <AtList>
          <AtListItem
            title="我的地址"
            arrow="right"
            onClick={() => toPage('/pages/Address/index')}
            iconInfo={{ size: 25, color: '#78A4FA', value: 'map-pin' }}
          />
        </AtList>
      </View>
    </View>
  );
};
export default My;
