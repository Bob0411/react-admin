import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import { authRoutes } from '../router';
interface ILeftBarState {
    defaultKeys: string[]
}
class LeftBar extends Component<any, ILeftBarState>{
    constructor(props: any) {
        super(props);
        this.state = {
            defaultKeys: []
        }
    }
    componentDidMount() {
        let path = this.props.history.location.pathname
        authRoutes.forEach((route) => {
            if (path === route.path) {
                this.setState({
                    defaultKeys: [route.id]
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