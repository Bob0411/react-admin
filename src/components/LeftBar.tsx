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
}
class LeftBar extends Component<any, ILeftBarState>{
    state: ILeftBarState = {
        defaultKeys: []
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
                            defaultKeys: [r.id]
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
                        < Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultKeys}>
                            {
                                authRoutes.filter((route) => route.path !== '*')
                                    .filter((route) => route.path !== '/login')
                                    .map((route) => (
                                        <Menu.Item key={route.id} icon={<UserOutlined />}>
                                            <NavLink to={route.path}>{route.title}</NavLink>
                                        </Menu.Item>
                                    ))
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