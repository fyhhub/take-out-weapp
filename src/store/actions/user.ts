import actionCreatorFactory from 'typescript-fsa'
import { UserModel } from '@/interfaces'
const actionCreator = actionCreatorFactory('@user')

export const setUserInfo = actionCreator<UserModel.UserInfo>('SET_LOCATION')
