import React, {Component} from "react";
import {Avatar, Dropdown, Layout, Menu} from "antd";
import {
    DownOutlined
} from '@ant-design/icons';
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AdminState} from "../store/states/AdminState";
import {Dispatch} from "redux";
import {logout} from "../store/actions/AdminAction";

const {Header} = Layout;

interface IProps extends AdminState, RouteComponentProps {
    logout: () => void
}

class TopHeader extends Component<IProps, any> {
    logout = () => {
        this.props.logout()
        this.props.history.replace('/login')
    }

    render() {
        return (
            <>
                <Header className="header">
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="1" onClick={this.logout}>
                                    退出
                                </Menu.Item>
                            </Menu>
                        }
                        className={'admin'}
                    >
                        <div>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                            <span className={'admin-name'}>
                                {this.props.admin.name}
                            </span>
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
            </>
        );
    }
}

interface IStoreState {
    admin: AdminState
}

const mapStateToProps = (state: IStoreState): AdminState => {
    return {...state.admin};
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
        logout: () => {
            logout(dispatch)
        }
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopHeader))
