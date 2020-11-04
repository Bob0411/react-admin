import React, { ReactNode } from "react"
import AdminList from "../pages/AdminList"
import Index from "../pages/Index"
import Login from "../pages/Login"
import Page404 from "../pages/Page404"
import Page403 from "../pages/Page403"
import RoleList from '../pages/RoleList'
import {
    DashboardTwoTone
} from '@ant-design/icons';
interface IRoute {
    id: string,
    icon?: ReactNode
    exact?: boolean
    path: string
    title: string
    isMenu: number
    component?: ReactNode,
    extend?: boolean
    routes?: IRoute[]
}
export const authRoutes: IRoute[] = [
    {
        id: '1-0',
        path: '/login',
        title: '登录',
        isMenu: 1,
        component: <Login />
    },
    {
        id: '2-0',
        icon: < DashboardTwoTone />,
        exact: true,
        path: '/',
        title: '首页',
        isMenu: 1,
        extend: true,
        component: <Index />
    },
    {
        id: '3-0',
        icon: < DashboardTwoTone />,
        path: '/admin',
        title: '管理员管理',
        extend: true,
        isMenu: 1,
        routes: [
            {
                id: '3-1',
                icon: < DashboardTwoTone />,
                path: '/admin/list',
                title: '管理员列表',
                isMenu: 0,
                component: <AdminList />
            }
        ]
    },
    {
        id: '4-0',
        icon: < DashboardTwoTone />,
        path: '/role',
        title: '角色管理',
        extend: true,
        isMenu: 1,
        routes: [
            {
                id: '4-1',
                icon: < DashboardTwoTone />,
                path: '/role/list',
                title: '角色列表',
                isMenu: 0,
                component: <RoleList />
            }
        ]
    },
    {
        id: '55555555555555555-0',
        path: '/403',
        title: '403',
        isMenu: 0,
        component: <Page403 />
    },
    {
        id: '6666666666666666-0',
        path: '*',
        title: '404',
        isMenu: 0,
        component: <Page404 />
    }
]