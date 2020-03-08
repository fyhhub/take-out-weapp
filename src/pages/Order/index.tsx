import Taro, { useState } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { BillList } from '@/components'
import "./index.scss";
const tabList = [
  { title: "全部订单" },
  { title: "待评价" },
  { title: "退款" }
];

const Order = () => {
  const [current, setCurrent] = useState(0);
  return (
    <View className="order">
      <AtTabs current={current} tabList={tabList} onClick={setCurrent} swipeable={false}>
        <AtTabsPane current={current} index={0}>
          <View className='order-item'>
            <BillList/>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className='order-item'>

          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className='order-item'>

          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Order;
