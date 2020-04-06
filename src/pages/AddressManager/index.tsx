import Taro, { useCallback, useDidShow, useState, useEffect, useRouter } from "@tarojs/taro";
import { View, Text, Input, Switch, Button } from "@tarojs/components";
import { chooseLocation } from '@/common/util/location'
import { useSelector } from "@/store";
import { useDispatch } from "@tarojs/redux";
import { createAddress, getAddressList, setDefaultAddress } from "@/store/actions";
import { AddressApi } from "@/api";
import { validate, catchError } from "@/common";
import "./index.scss";
const chooseLoc = Taro.requirePlugin('chooseLocation')
const AddressManager = () => {
  const address = useSelector(state => state.common.address)
  const userinfo = useSelector(state => state.user.userinfo)
  const addressList = useSelector(state => state.address.list)
  const dispatch = useDispatch()
  const router = useRouter()
  const [form, setForm] = useState({
    address:'在地图选择',
    latitude: 0,
    longitude: 0,
    name: '',
    phone: '',
    detail: '',
    default: false
  })

  useDidShow(() => {
    const location = chooseLoc.getLocation()
    if (location) {
      const { address, latitude, longitude } = location
      setForm({
        ...form,
        address,
        latitude,
        longitude
      })
    }
  })

  useEffect(() => {
    if (router.params.id) {
      const address = addressList.find(item => item.id === +router.params.id)
      setForm({
        ...form,
        ...address
      })
    }
  }, [router.params.id])

  const handleChooseLocation = useCallback(() => {
    chooseLocation(address.latitude, address.longitude)
  }, [address])

  const handleSubmitClick = useCallback(async () => {
    if (router.params.id) {
      try {
        Taro.showLoading()
        const res = await AddressApi.updateAddress(form)
        if (validate(res)) {
          dispatch(getAddressList(userinfo.openid!))
          Taro.hideLoading()
          Taro.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
        }
      } catch (e) {
        catchError(e)
        Taro.hideLoading()
      }
    } else {
      dispatch(createAddress({
        ...form,
        openid: userinfo.openid
      }))
    }
    Taro.navigateBack()
  }, [form, router.params.id])

  const handleSetDefault = useCallback(() => {
    // if (router.params.id) {
    //   dispatch(setDefaultAddress({
    //     id: +router.params.id,
    //     def: Number(!form.default)
    //   }))
    // }
    setForm({ ...form, default: !form.default })
  }, [form])
  return (
    <View className="content addressManager">
      <View className="row b-b">
        <Text className="tit">联系人</Text>
        <Input className="input" type="text" placeholder="收货人姓名" value={form.name} onInput={(e) => setForm({ ...form, name: e.detail.value })}/>
      </View>
      <View className="row b-b">
        <Text className="tit">手机号</Text>
        <Input className="input" type="number" placeholder="收货人手机号码" value={form.phone} onInput={(e) => setForm({ ...form, phone: e.detail.value })}/>
      </View>
      <View className="row b-b" onClick={handleChooseLocation}>
        <Text className="tit">地址</Text>
        <Text className="input">{ form.address }</Text>
        <Text
          className="at-icon at-icon-map-pin"
          style={{ fontSize: "30rpx", color: "#999" }}
        >
        </Text>
      </View>
      <View className="row b-b">
        <Text className="tit">补充说明</Text>
        <Input className="input" type="text" value={form.detail} onInput={(e) => setForm({ ...form, detail: e.detail.value })}/>
      </View>
      <View className="row default-row">
        <Text className="tit">设为默认</Text>
        <Switch checked={form.default} onChange={handleSetDefault}/>
      </View>
      <Button className="add-btn" onClick={handleSubmitClick}>提交</Button>
    </View>
  );
};

export default AddressManager;
