import actionCreatorFactory from 'typescript-fsa'
import { CartModel } from '@/interfaces'
const actionCreator = actionCreatorFactory('@cart')

export const setCartItem = actionCreator<CartModel.CartItem>('SET_CART_ITEM')
export const setCartListShow = actionCreator<boolean>('SET_CART_LIST_SHOW')

export const clearCart = actionCreator('CLEAR_CART')

