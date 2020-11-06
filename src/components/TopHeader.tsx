import React, {Component} from "react";
import {Dropdown, Layout, Menu} from "antd";
const {Header} = Layout;

const menu = (
    <Menu>
        <Menu.Item key="1">
            1st menu item
        </Menu.Item>
    </Menu>
)
class TopHeader extends Component<any, any> {
    render() {
        return (
            <>
                <Header className="header">
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    {/*<Dropdown.Button overlay={menu} placement="bottomCenter">*/}
                    {/*    Dropdown*/}
                    {/*</Dropdown.Button>*/}
                </Header>
            </>
        );
    }
}
export default TopHeader