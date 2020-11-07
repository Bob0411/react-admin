import React, {Component} from "react";
import {Button, Form, Input, message, Modal, Select, Space} from "antd";
import {IAdmin} from "../../store/states/AdminState";
import {updateAdmin} from "../../api/admin";
import {IRole} from "../interfaces/IRole";
import {getRoleList} from "../../api/role";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IEditAdminProps {
    admin: IAdmin
    callback: (admin: IAdmin) => void
}

interface IEditAdminState {
    roleList: IRole[]
}

class EditAdmin extends Component<IEditAdminProps, IEditAdminState> {
    state: IEditAdminState = {
        roleList: []
    }

    getRoleList() {
        getRoleList().then(response => {
            const {data} = response.data
            this.setState({
                roleList: data
            })
        })
    }

    editAdmin = () => {
        this.getRoleList()
    }
    handleCancel = () => {
        this.props.callback(this.props.admin)
    }
    saveAdmin = (admin: IAdmin) => {
        if (this.props.admin) {
            if (admin.password === '') {
                // @ts-ignore
                delete admin.password
            }
            updateAdmin(this.props.admin.id, admin).then(response => {
                const {code, msg} = response.data
                if (code === 0) {
                    message.success(msg)
                    this.props.callback({...this.props.admin, ...admin})
                } else {
                    message.error(msg)
                    this.props.callback(this.props.admin)
                }
            })
        }
    }

    componentDidMount() {
        this.getRoleList()
    }

    render() {
        return (
            <>
                <Modal
                    title="编辑管理员信息"
                    visible
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确认'
                    footer={null}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            name: this.props.admin.name,
                            password: '',
                            roleId: this.props.admin.roleId
                        }}
                        onFinish={this.saveAdmin}
                    >
                        <Form.Item
                            label="名称"
                            name="name"
                            rules={[{required: true, message: '请输入管理员名称'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{
                                validator: (rules, value: string) => {
                                    if (value === '') {
                                        return Promise.resolve()
                                    }
                                    if (value.length < 6) {
                                        return Promise.reject('密码长度不能小于6位')
                                    } else if (value.length > 22) {
                                        return Promise.reject('密码长度不能大于22位')
                                    }
                                    return Promise.resolve()
                                }
                            }]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item
                            label='角色'
                            name='roleId'
                        >
                            <Select
                                placeholder="请选择角色"
                                showSearch
                            >
                                {
                                    this.state.roleList.map((role) => (
                                        <Select.Option
                                            value={role.id}
                                            key={role.id}>{role.roleName}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default EditAdmin