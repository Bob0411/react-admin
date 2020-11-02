import { ReactNode } from "react";

interface IRoute {
    id: string,
    exact?: boolean
    path: string
    title: string
    component?: ReactNode,
    extend?: boolean
    routes?: IRoute[]
}
export interface PermissionState {
    permissionList: IRoute[]
}