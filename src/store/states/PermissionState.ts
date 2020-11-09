import {ReactNode} from "react";

export interface IRoute {
    id: string,
    exact?: boolean
    path: string
    title: string
    parentId?: number
    isMenu?: number
    component?: ReactNode
    routes?: IRoute[]
}

export interface PermissionState {
    loading: boolean
    permissionList: IRoute[]
}