import React, {Component} from 'react'
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom'
import {Menu} from 'antd';
import {matchPath} from "react-router";
import {authRoutes} from '../router';
import {IRoute} from '../store/states/PermissionState';

interface ILeftBarState {
    defaultKeys: string[]
    defaultOpenKeys: string[]
    permissionSet: Set<String>
    height: number
}

interface IProps extends RouteComponentProps {
    permissionList: IRoute[]
}

class LeftBar extends Component<IProps, ILeftBarState> {
    state: ILeftBarState = {
        defaultKeys: [],
        defaultOpenKeys: [],
        permissionSet: new Set<String>(),
        height: 0
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
        let permissionSet: Set<string> = new Set<string>()
        this.props.permissionList.forEach((p: IRoute) => permissionSet.add(p.path))
        this.setState({
            permissionSet: permissionSet,
            height: document.body.clientHeight-62
        })

    }

    render() {
        return (
            <div style={{minHeight: this.state.height + 'px'}}>
                <div className="logo"/>
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
                                    .filter((route) => this.state.permissionSet.has(route.path))
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
                                                        route.routes
                                                            .filter((route) => this.state.permissionSet.has(route.path))
                                                            .map((r) => (
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