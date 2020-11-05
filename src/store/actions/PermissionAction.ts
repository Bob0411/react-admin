import {PermissionType} from './../types/PermissionType';
import {getAdminInfo} from './../../api/index';
import {Dispatch} from 'redux'
import {get} from "../../utils/storage";

export interface PermissionAction {
    type: PermissionType,
    data?: any
}

export const getPermissionList = (dispatch: Dispatch) => {
    if (get('token') !== null) {
        dispatch({
            type: PermissionType.SET,
            data: {permissionList: [], loading: true}
        });
        getAdminInfo().then(response => {
            const {permissionList} = response.data.data
            dispatch({
                type: PermissionType.SET,
                data: {permissionList: permissionList, loading: false}
            });
        })
    } else {
        dispatch({
            type: PermissionType.SET,
            data: {permissionList: [], loading: false}
        });
    }
}