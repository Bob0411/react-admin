import {PermissionType} from './../types/PermissionType';
import {getAdminInfo} from './../../api/index';
import {Dispatch} from 'redux'

export interface PermissionAction {
    type: PermissionType,
    data?: any
}

export const getPermissionList = (dispatch: Dispatch) => {
    dispatch({
        type: PermissionType.SET,
        data: {permissionList: [], loading: true}
    })
    getAdminInfo().then(response => {
        const {code,data:{permissionList} } = response.data
        if (code === 4003) {
            dispatch({
                type: PermissionType.SET,
                data: {permissionList: [], loading: false}
            });
        } else {
            dispatch({
                type: PermissionType.SET,
                data: {permissionList: permissionList, loading: false}
            });
        }
    })
}