import { GoodsModel } from "./goods";

export namespace OrderModel {
  export interface Order {
    id?: number
    business_id: number
    goods_list: string | GoodsModel.Goods[]
    openid: string
    phone: string
    address: string
    name: string
    status: number
    total: number
    mode: number
    pay_status: number
    time: string
    isComment: number
    goodsMap?: { [key: string]: number }
  }
}
