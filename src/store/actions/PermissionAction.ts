import { PermissionType } from './../types/PermissionType';
import { getAdminInfo } from './../../api/index';
import { Dispatch } from 'redux'
export interface PermissionAction {
    type: PermissionType,
    data?: any
}
export const getPermissionList = (dispatch: Dispatch) => {
    dispatch({
        type: PermissionType.SET,
        data: { permissionList: [], loadng: true }
    })
    getAdminInfo().then(response => {
        const { permissionList } = response.data.data
        dispatch({
            type: PermissionType.SET,
            data: { permissionList: permissionList, loading: false }
        })
    })
}