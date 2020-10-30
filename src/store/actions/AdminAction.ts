import { rm, set } from './../../utils/storage';
import { AdminType } from './../types/AdminType';
import { Dispatch } from 'redux'
export interface AdminAction {
    type: AdminType,
    data?: any
}
export const doLogin = (dispatch: Dispatch, data: any) => {
    const { accessToken, admin } = data
    set('token', accessToken)
    dispatch({ type: AdminType.LOGIN, data: admin })
}
export const logout = (dispatch: Dispatch) => {
    rm('token')
    dispatch({
        type: AdminType.LOGOUT
    })
}