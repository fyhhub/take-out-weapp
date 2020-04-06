export namespace AddressModel {
  export interface Address {
    id?: number
    address: string
    latitude: number
    longitude: number
    name: string
    phone: string
    detail: string
    default: boolean
    openid?: string
  }
}
