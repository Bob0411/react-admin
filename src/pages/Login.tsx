import React, {Component} from 'react'
import {Button, Form, Input} from 'antd'
import {login} from '../api';
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {doLogin, syncAdminInfo} from '../store/actions/AdminAction';
import {RouteComponentProps, withRouter} from "react-router";
import {getPermissionList} from '../store/actions/PermissionAction';
import {set} from "../utils/storage";
import '../static/css/login.css'

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IState {
    name: string
    password: string
}

interface IProps extends RouteComponentProps {
    login: (data: any) => void
    getAdminInfo: () => void
    getPermissionList: () => void
}

class Login extends Component<IProps, IState> {
    state: IState = {
        name: '',
        password: ''
    }
    onFinish = (values: IState) => {
        login(values).then(response => {
            const {accessToken, admin} = response.data.data
            set('token', accessToken)
            return admin
        }).then(admin => {
            this.props.login(admin)
            this.props.getAdminInfo()
            this.props.getPermissionList()
            this.props.history.replace('/')
        })
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className='login-form'>
                <Form
                    ref={null}
                    initialValues={this.state}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    {...layout}
                >
                    <Form.Item
                        label="用户名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '用户名不可以为空'
                            },
                            {
                                type: "string",
                                min: 2,
                                message: '用户名长度不可以小于2位'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '密码不可以为空'
                            },
                            {
                                type: "string",
                                min: 2,
                                message: '密码长度不可以小于2位'
                            }
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (data: any) => {
        doLogin(dispatch, data)
    },
    getAdminInfo: () => {
        syncAdminInfo(dispatch)
    },
    getPermissionList: () => {
        getPermissionList(dispatch)
    }
})
export default connect(null, mapDispatchToProps)(withRouter(Login))