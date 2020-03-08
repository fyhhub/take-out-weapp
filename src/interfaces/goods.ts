export namespace GoodsModel {
  export interface Goods {
    business_id: number
    goods_detail: string
    goods_discount: number
    goods_id: number
    goods_image: string
    goods_name: string
    goods_price: number
    goods_sale: number
    goods_type: string
  }
  export interface GoodsList {
    [goods_id: string]: GoodsModel.Goods
  }
}
