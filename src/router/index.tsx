import React, {ReactNode} from "react"
import AdminList from "../pages/AdminList/AdminList"
import Index from "../pages/Index"
import Login from "../pages/Login"
import Page404 from "../pages/Page404"
import Page403 from "../pages/Page403"
import RoleList from '../pages/RoleList/RoleList'
import {DashboardOutlined, DashboardTwoTone, TeamOutlined, UserOutlined} from '@ant-design/icons';
import CategoryList from "../pages/Catalog/Category/CategoryList";
import AddCategory from "../pages/Catalog/Category/AddCategory";
import ProductList from "../pages/Catalog/Product/ProductList";
import AddProduct from "../pages/Catalog/Product/AddProduct";
import EditProduct from "../pages/Catalog/Product/EditProduct";
import EditCategory from "../pages/Catalog/Category/EditCategory";
import OrderList from "../pages/Order/OrderList";
import UserList from "../pages/User/UserList";

interface IRoute {
    id: string,
    redirect?: string
    icon?: ReactNode
    exact?: boolean
    path: string
    title: string
    isMenu: number
    component?: ReactNode
    isChildPage?: boolean
    routes?: IRoute[]
}

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
    },
    {
        id: '5-0',
        icon: <TeamOutlined/>,
        path: '/admin/catalog',
        title: '分类管理',
        isMenu: 1,
        routes: [
            {
                id: '5-1',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/category/list',
                title: '分类列表',
                isMenu: 0,
                component: <CategoryList/>
            },
            {
                id: '5-2',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/category/add',
                title: '新增分类',
                isMenu: 0,
                isChildPage: true,
                component: <AddCategory/>
            },
            {
                id: '5-3',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/product/list',
                title: '产品列表',
                isMenu: 0,
                component: <ProductList/>
            },
            {
                id: '5-4',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/product/add',
                title: '新增产品',
                isMenu: 0,
                isChildPage: true,
                component: <AddProduct/>
            },
            {
                id: '5-5',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/product/edit/:productId',
                title: '编辑产品',
                isMenu: 0,
                isChildPage: true,
                component: <EditProduct/>
            },
            {
                id: '5-6',
                icon: <DashboardTwoTone/>,
                path: '/admin/catalog/category/edit/:categoryId',
                title: '编辑分类',
                isMenu: 0,
                isChildPage: true,
                component: <EditCategory/>
            },
        ]
    },
    {
        id: '6-0',
        icon: <DashboardTwoTone/>,
        path: '/admin/order',
        title: '订单管理',
        isMenu: 1,
        routes: [
            {
                id: '6-1',
                icon: <DashboardTwoTone/>,
                path: '/admin/order/list',
                title: '订单列表',
                isMenu: 0,
                component: <OrderList/>
            },
        ]
    },
    {
        id: '7-0',
        icon: <DashboardTwoTone/>,
        path: '/admin/user',
        title: '用户管理',
        isMenu: 1,
        routes: [
            {
                id: '7-1',
                icon: <DashboardTwoTone/>,
                path: '/admin/user/list',
                title: '用户列表',
                isMenu: 0,
                component: <UserList/>
            },
        ]
    }
]
export const topRoute: IRoute[] = [
    {
        id: '50-0',
        icon: <DashboardOutlined/>,
        exact: true,
        path: '/admin/top1',
        title: 'top1',
        isMenu: 0,
        component: <>top1</>
    },
    {
        id: '50-1',
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