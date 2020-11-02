import React, { ReactNode } from "react"
import AdminList from "../pages/AdminList"
import Index from "../pages/Index"
import Login from "../pages/Login"
import Page404 from "../pages/Page404"
import Page403 from "../pages/Page403"

interface IRoute {
    id: string,
    exact?: boolean
    path: string
    title: string
    component?: ReactNode,
    extend?: boolean
    routes?: IRoute[]
}
export const unAuthRoute: IRoute[] = [
    {
        id: '1-0',
        path: '/login',
        title: '登录',
        component: <Login />
    },
    {
        id: '2-0',
        path: '*',
        title: '404',
        component: <Page404 />
    }
]
export const authRoutes: IRoute[] = [
    {
        id: '1-0',
        path: '/login',
        title: '登录',
        component: <Login />
    },
    {
        id: '2-0',
        exact: true,
        path: '/',
        title: '首页',
        extend: true,
        component: <Index />
    },
    {
        id: '3-0',
        path: '/admin',
        title: 'admin',
        extend: true,
        component: <AdminList />,
        routes: [
            {
                id: '3-1',
                path: '/admin/list',
                title: '',
                component: <>/admin/list</>
            }
        ]
    },
    {
        id: '55555555555555555-0',
        path: '/403',
        title: '403',
        component: <Page403 />
    },
    {
        id: '6666666666666666-0',
        path: '*',
        title: '404',
        component: <Page404 />
    }
]