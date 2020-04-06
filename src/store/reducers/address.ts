import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { AddressModel } from '@/interfaces'
import { addAddress, setAddressList, setDefaultAddressAction } from '@/store/actions'
const INIT_STATE = {
  list: [] as AddressModel.Address[],
  default: {} as AddressModel.Address
}

const reducer = reducerWithInitialState(INIT_STATE)
.case(addAddress, (state, address) => {
  let list = state.list
  if (address.default) {
    list = [address, ...list]
  } else {
    list = [...list, address]
  }
  return {
    ...state,
    list
  }
})
.case(setAddressList, (state, list) => {
  const def = list.find(item => item.default)
  return {
    ...state,
    list,
    default: def
  } as typeof INIT_STATE
})

.case(setDefaultAddressAction, (state, address) => ({
  ...state,
  default: address
}))

export default reducer
