import React from "react"
import AdminList from "../pages/AdminList/AdminList"
import Index from "../pages/Index"
import Login from "../pages/Login"
import Page404 from "../pages/Page404"
import Page403 from "../pages/Page403"
import RoleList from '../pages/RoleList/RoleList'
import {DashboardOutlined, DashboardTwoTone, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {IRoute} from "../store/states/PermissionState";

export const leftRoute: IRoute[] = [
    {
        id: '1-1',
        icon: <DashboardOutlined/>,
        exact: true,
        path: '/admin/dashboard',
        title: '仪表盘',
        isMenu: 0,
        component: <Index/>
    },
    {
        id: '3-0',
        icon: <UserOutlined/>,
        path: '/admin/list',
        title: '管理员管理',
        isMenu: 1,
        routes: [
            {
                id: '3-1',
                icon: <UserOutlined/>,
                path: '/admin/admin/list',
                title: '管理员列表',
                isMenu: 0,
                component: <AdminList/>
            }
        ]
    },
    {
        id: '4-0',
        icon: <TeamOutlined/>,
        path: '/admin/role',
        title: '角色管理',
        isMenu: 1,
        routes: [
            {
                id: '4-1',
                icon: <DashboardTwoTone/>,
                path: '/admin/role/list',
                title: '角色列表',
                isMenu: 0,
                component: <RoleList/>
            }
        ]
    }
]
export const topRoute: IRoute[] = [
    {
        id: '5-0',
        icon: <DashboardOutlined/>,
        exact: true,
        path: '/admin/top1',
        title: 'top1',
        isMenu: 0,
        component: <>top1</>
    },
    {
        id: '5-1',
        icon: <DashboardOutlined/>,
        exact: true,
        path: '/admin/top2',
        title: 'top2',
        isMenu: 0,
        component: <>top2</>
    }
]

export const authRoutes: IRoute[] = [
    ...leftRoute,
    ...topRoute
]
export const unAuthRouters: IRoute[] = [
    {
        id: '0-0',
        path: '/login',
        title: '登录',
        isMenu: 1,
        component: <Login/>
    },
    {
        id: '55555555555555555-0',
        path: '/403',
        title: '403',
        isMenu: 0,
        component: <Page403/>
    },
    {
        id: '6666666666666666-0',
        path: '*',
        title: '404',
        isMenu: 0,
        component: <Page404/>
    }
]