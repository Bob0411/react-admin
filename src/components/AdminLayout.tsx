import React, { Component } from 'react'
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import LeftBar from './LeftBar';
import { withRouter, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import { PermissionState } from '../store/states/PermissionState'
const { Header, Sider, Content } = Layout;
interface IAdminLayoutState {
    collapsed: boolean
}
// interface IAdminLayoutProps extends RouteComponentProps {

// }
class AdminLayout extends Component<any, IAdminLayoutState> {
    state: IAdminLayoutState = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<IAdminLayoutState>, nextContext: any): boolean {
        // 请求的页面如果不在权限范围内就跳转到403页面 [403 forbidden]
        let path = this.props.location.pathname
        let res = nextProps.permissionList.filter((p: any) => {
            const match = matchPath(path, {
                path: p.path,
                exact: true,
                strict: false
            });
            return match !== null
        })
        if (res.length <= 0) {
            this.props.history.push('/403')
        }
        return res.length > 0
    }
    render() {
        if (this.props.permissionList.length <= 0) {
            return (
                <>
                    loading
                </>
            )
        }
        return (
            <>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <LeftBar />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}

                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
interface IStoreState {
    permission: PermissionState
}
const mapStateToProps = (state: IStoreState): PermissionState => {
    return { ...state.permission };
}
export default connect(mapStateToProps)(withRouter(AdminLayout))

