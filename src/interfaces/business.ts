export namespace BusinessModel {
  export interface Business {
    business_account: string
    business_address: string
    business_grade: number
    business_id: number
    business_image: string
    business_latitude: string
    business_longitude: string
    business_name: string
    business_phone: string
    business_sale: number
    business_servetime: string
    business_sd: number
    business_df: number
    business_introduce: string
    category_id: number
  }
}

export interface GetBusinessList {
  data: BusinessModel.Business[]
  pageSize: number
  pageNo: number
  totalPage: number
  totalCount: number,
  locationMap: any
  dataMap: {
    [key: string]: BusinessModel.Business
  }
}
