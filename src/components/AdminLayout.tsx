import React, { Component } from 'react'
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import LeftBar from './LeftBar';

const { Header, Sider, Content } = Layout;

interface IAdminLyoutProps {
    extend?: boolean
}
interface IAdminLayoutState {
    collapsed: boolean
}
class AdminLayout extends Component<IAdminLyoutProps, IAdminLayoutState> {
    state: IAdminLayoutState = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        if (!this.props.extend) {
            return (
                <>
                    {this.props.children}
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
export default AdminLayout

