import Taro, { useState, useDidShow, useEffect } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtActivityIndicator } from "taro-ui";
import { BillList, Empty } from '@/components'
import { useAuth } from "@/common";
import { useSelector } from "@/store";
import { useDispatch } from "@tarojs/redux";
import { getOrderList } from "@/store/actions/order";
import "./index.scss";
const tabList = [
  { title: "全部订单" },
  { title: "待评价" },
];

const Order = () => {
  useAuth()
  const [current, setCurrent] = useState(0)
  const userinfo = useSelector(state => state.user.userinfo)
  const pending = useSelector(state => state.order.pending)
  const list = useSelector(state => state.order.list)
  const noCommentList = useSelector(state => state.order.noCommentList)
  const refundList = useSelector(state => state.order.refundList)
  const dispatch = useDispatch()
  useEffect(() => {
    userinfo.openid && dispatch(getOrderList(userinfo.openid!))
  }, [userinfo])
  useDidShow(() => {
    dispatch(getOrderList(userinfo.openid!))
  })
  return pending ? (<AtActivityIndicator mode='center' content='加载中...'></AtActivityIndicator>) :(
    <View className="order">
      <AtTabs current={current} tabList={tabList} onClick={setCurrent} swipeable={false}>
        <AtTabsPane current={current} index={0}>
          <View className='order-item'>
            <BillList list={list || []}/>
            {
              !list.length ? <Empty title='暂无订单' style={{ paddingTop: '40rpx', height: '100vh' }}/> : null
            }
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className='order-item'>
            <BillList list={noCommentList || []} noComment={true}/>
            {
              !noCommentList.length ? <Empty title='暂无订单' style={{ paddingTop: '40rpx', height: '100vh' }}/> : null
            }
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Order;
