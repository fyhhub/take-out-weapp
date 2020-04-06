import actionCreatorFactory from 'typescript-fsa'
import { GoodsModel } from '@/interfaces'
const actionCreator = actionCreatorFactory('@goods')

export const setGoodsList = actionCreator<GoodsModel.GoodsList>('SET_GOODS_LIST')
