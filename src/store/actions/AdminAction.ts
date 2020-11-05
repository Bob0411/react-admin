import {getAdminInfo} from './../../api/index';
import {get, rm, set} from './../../utils/storage';
import {AdminType} from './../types/AdminType';
import {Dispatch} from 'redux'

export interface AdminAction {
    type: AdminType,
    data?: any
}

export const doLogin = (dispatch: Dispatch, data: any) => {
    const {accessToken, admin} = data
    set('token', accessToken)
    dispatch({type: AdminType.LOGIN, data: admin})
}
export const logout = (dispatch: Dispatch) => {
    rm('token')
    dispatch({
        type: AdminType.LOGOUT
    })
}
export const syncAdminInfo = (dispatch: Dispatch) => {

    if (get('token') !== null) {
        dispatch({
            type: AdminType.LOADING,
            data: {loading: true}
        })
        getAdminInfo().then(response => {
            const {admin} = response.data.data
            dispatch({
                type: AdminType.SET,
                data: {...admin, loading: false}
            })
        });
    } else {
        dispatch({
            type: AdminType.LOADING,
            data: {loading: false}
        })
    }
}