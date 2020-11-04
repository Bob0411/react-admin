import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import { matchPath } from "react-router";

import {
    UserOutlined
} from '@ant-design/icons';
import { authRoutes } from '../router';
interface ILeftBarState {
    defaultKeys: string[]
    defaultOpenKeys: string[]
}
class LeftBar extends Component<any, ILeftBarState>{
    state: ILeftBarState = {
        defaultKeys: [],
        defaultOpenKeys: []
    }
    componentDidMount() {
        let path = this.props.history.location.pathname
        authRoutes.forEach((route) => {
            let match = matchPath(path, {
                path: route.path,
                exact: true,
                strict: false
            })
            if (route.path === '*') {
                return
            }
            if (match !== null) {
                this.setState({
                    defaultKeys: [route.id]
                })
            } else {
                route.routes?.forEach((r) => {
                    let match1 = matchPath(path, {
                        path: r.path,
                        exact: true,
                        strict: false
                    })
                    if (match1 !== null) {
                        this.setState({
                            defaultKeys: [r.id],
                            defaultOpenKeys: [route.id]
                        })
                    }
                })
            }
        })
    }
    render() {
        return (
            <div>
                <div className="logo" />
                {
                    this.state.defaultKeys.length > 0 ?
                        < Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={this.state.defaultKeys}
                            defaultOpenKeys={this.state.defaultOpenKeys}
                        >
                            {
                                authRoutes.filter((route) => route.path !== '*')
                                    .filter((route) => route.path !== '/login')
                                    .filter((route) => route.path !== '/403')
                                    .map((route) => {
                                        if (route.routes) {
                                            return (
                                                <Menu.SubMenu
                                                    key={route.id}
                                                    title={
                                                        <span>
                                                            {route.icon}
                                                            <span>{route.title}</span>
                                                        </span>
                                                    }
                                                >
                                                    {
                                                        route.routes.map((r) => (
                                                            <Menu.Item key={r.id} icon={r.icon}>
                                                                <NavLink to={r.path}>{r.title}</NavLink>
                                                            </Menu.Item>)
                                                        )
                                                    }
                                                </Menu.SubMenu>
                                            )
                                        } else {
                                            return (
                                                <Menu.Item key={route.id} icon={route.icon}>
                                                    <NavLink to={route.path}>{route.title}</NavLink>
                                                </Menu.Item>
                                            )
                                        }
                                    })
                            }


                        </Menu>
                        :
                        ''
                }
            </div>
        )
    }
}
export default withRouter(LeftBar)