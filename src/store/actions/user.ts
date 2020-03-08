import actionCreatorFactory from 'typescript-fsa'
import { check, catchError } from "@/common"
import { UserModel } from '@/interfaces'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
const actionCreator = actionCreatorFactory('@user')

export const setUserInfo = actionCreator<UserModel.UserInfo>('SET_LOCATION')
