import React, {Component} from 'react'
import {NavLink, RouteComponentProps, withRouter} from 'react-router-dom'
import {Menu} from 'antd';
import {matchPath} from "react-router";
import {authRoutes, leftRoute} from '../router';
import {IRoute} from "../store/states/PermissionState";

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
    highLightMenu = (authRoutes?: IRoute[], route?: IRoute) => {
        let path = this.props.history.location.pathname
        authRoutes?.forEach((r: IRoute) => {
            let match = matchPath(path, {
                path: r.path,
                exact: true,
                strict: false
            })
            if (match !== null) {
                if (route) {
                    this.setState({
                        defaultKeys: [r.id],
                        defaultOpenKeys: [route.id]
                    });
                } else {
                    this.setState({
                        defaultKeys: [r.id]
                    });
                }
                return
            } else {
                this.highLightMenu(r?.routes, r)
            }
        })
    }

    componentDidMount() {
        let permissionSet: Set<string> = new Set<string>()
        this.props.permissionList.forEach((p: IRoute) => permissionSet.add(p.path))
        this.highLightMenu(authRoutes)
        this.setState({
            permissionSet: permissionSet,
            height: document.body.clientHeight - 62
        })
    }

    generateMenu = (routerList?: IRoute[]) => {
        return (
            <>
                {
                    routerList?.filter((route) => this.state.permissionSet.has(route.path))
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
                                        {this.generateMenu(route.routes)}
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
            </>
        )
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
                            {this.generateMenu(leftRoute)}
                        </Menu>
                        :
                        null
                }
            </div>
        )
    }
}

export default withRouter(LeftBar)