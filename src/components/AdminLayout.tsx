import React, {Component, ReactNode} from 'react'
import {Breadcrumb, Layout, Spin} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import LeftBar from './LeftBar';
import {withRouter, matchPath, RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {IRoute, PermissionState} from '../store/states/PermissionState'
import TopHeader from "./TopHeader";

const {Sider, Content} = Layout;

interface IAdminLayoutState {
    collapsed: boolean
    auth: boolean
}

interface IAdminLayoutProps extends RouteComponentProps {
    loading: boolean
    permissionList: IRoute[]
    children?: ReactNode
}

class AdminLayout extends Component<IAdminLayoutProps, IAdminLayoutState> {
    state: IAdminLayoutState = {
        collapsed: false,
        auth: false
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    static getDerivedStateFromProps(nextProps: Readonly<IAdminLayoutProps>, nextState: Readonly<IAdminLayoutState>) {
        if (nextProps.loading) {
            return null
        }
        if (nextProps.permissionList.length === 0) {
            nextProps.history.push('/login')
            return {auth: false}
        }
        let path = nextProps.location.pathname
        let res = nextProps.permissionList.filter((p: any) => {
            const match = matchPath(path, {
                path: p.path,
                exact: true,
                strict: false
            });
            return match !== null
        })
        if (res.length <= 0) {
            nextProps.history.push('/403')
            return {auth: false}
        }
        return {auth: true}
    }

    render() {
        if (!this.state.auth) {
            return (
                <div className='loading'>
                    <Spin tip='玩命加载中。。。'/>
                </div>
            )
        }
        return (
            <>
                <Layout>
                    <TopHeader/>
                    <Layout>

                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <LeftBar permissionList={this.props.permissionList}/>
                        </Sider>
                        <Layout className="site-layout">
                            {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                            {/*    className: 'trigger',*/}
                            {/*    onClick: this.toggle,*/}
                            {/*})}*/}
                            <span className={'trigger'} onClick={this.toggle} style={{marginLeft:'8px',float:"left",height:'100%'}}>
                                {
                                    this.state.collapsed?
                                        <MenuUnfoldOutlined/>
                                        :
                                        <MenuFoldOutlined/>
                                }
                            </span>
                            <Breadcrumb style={{ margin: '8px 16px' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
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

                </Layout>
            </>
        )
    }
}

interface IStoreState {
    permission: PermissionState
}

const mapStateToProps = (state: IStoreState): PermissionState => {
    return {...state.permission};
}
export default connect(mapStateToProps)(withRouter(AdminLayout))

