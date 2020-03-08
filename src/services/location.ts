
import request from '@/common/request'
import { CommonModel } from '@/interfaces'
export function getLocation(geohash: string) {
  return request.get<CommonModel.ILocation>(`/v2/pois/${geohash}`)
}
