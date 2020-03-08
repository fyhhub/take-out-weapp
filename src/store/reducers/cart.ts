import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { setCartItem, clearCart, setCartListShow } from '@/store/actions'
import { CartModel } from '@/interfaces'
const INIT_STATE = {
  cart: {} as CartModel.CartItem,
  cartListShow: false
}

const reducer = reducerWithInitialState(INIT_STATE)
  .case(setCartItem, (state, item) => ({
    ...state,
    cart: {
      ...state.cart,
      ...item
    }
  }))
  .case(clearCart, (state) => ({
    ...state,
    cart: {}
  }))
  .case(setCartListShow, (state, cartListShow) => ({
    ...state,
    cartListShow
  }))

export default reducer
