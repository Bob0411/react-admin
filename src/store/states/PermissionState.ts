import { ReactNode } from "react";

export interface IRoute {
    id: string,
    exact?: boolean
    path: string
    title: string
    component?: ReactNode,
    extend?: boolean
    routes?: IRoute[]
}
export interface PermissionState {
    loading: boolean
    permissionList: IRoute[]
}