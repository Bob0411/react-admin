import React, {Component} from 'react'
import {Button, Space, Table, Popconfirm, message, Modal, Form, Input, Select} from 'antd'
import {getAdminList, updateAdmin} from '../../api/admin'
import Permission from '../../components/Permission'
import {getRoleList} from '../../api/role'
import DeleteAdmin from "./DeleteAdmin";
import {IAdmin} from "../../store/states/AdminState";

interface IRole {
    id: number
    roleName: string
}

interface IAdminListState {
    adminList: IAdmin[]
    roleList: IRole[]
    admin?: IAdmin
    page: number
    perPage: number
    total: number
    visible: boolean
}

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class AdminList extends Component<any, IAdminListState> {
    state: IAdminListState = {
        adminList: [],
        roleList: [],
        page: 1,
        perPage: 15,
        total: 0,
        visible: false
    }

    constructor(props: any) {
        super(props);
        this.getAdminList()
    }

    getRoleList() {
        getRoleList().then(response => {
            const {data} = response.data
            this.setState({
                roleList: data
            })
        })
    }

    deleteAdminCallback = (admin: IAdmin) => {
        this.setState({
            adminList: this.state.adminList.filter(a => a.id !== admin.id)
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        })
    }
    editAdmin = (admin: IAdmin) => {
        this.getRoleList()
        this.setState({
            admin: admin
        })
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    saveAdmin = (admin: IAdmin) => {
        if (this.state.admin) {
            if (admin.password === '') {
                // @ts-ignore
                delete admin.password
            }
            updateAdmin(this.state.admin?.id, admin).then(response => {
                const {code, msg} = response.data
                if (code === 0) {
                    message.success(msg)
                    this.setState({
                        visible: false
                    })
                } else {
                    message.error(msg)
                }
            })
        }
    }
    saveFailed = () => {
    }
    getAdminList = (page: number = 1) => {
        getAdminList(page).then(response => {
            const {data: {currentPage, data, total, perPage}} = response.data
            this.setState({
                page: currentPage,
                adminList: data,
                total: total,
                perPage: perPage
            })
        })
    }
    onChange = (page: number) => {
        this.getAdminList(page)
    }
    changeForm = (value: any) => {
        this.setState({
            admin: {...this.state.admin, ...value}
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.visible && this.state.admin ?
                        <Modal
                            title="编辑管理员信息"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            cancelText='取消'
                            okText='确认'
                            footer={null}
                        >
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    name: this.state.admin?.name,
                                    password: '',
                                    roleId: this.state.admin.roleId
                                }}
                                onFinish={this.saveAdmin}
                                onValuesChange={this.changeForm}
                                onFinishFailed={this.saveFailed}
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
                                            this.state.roleList.map((role) => (<Select.Option value={role.id}
                                                                                              key={role.id}>{role.roleName}</Select.Option>))
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
                        :
                        ''
                }

                <Table
                    pagination={{
                        position: ['bottomCenter'],
                        total: this.state.total,
                        defaultCurrent: this.state.page,
                        defaultPageSize: this.state.perPage,
                        showSizeChanger: false,
                        onChange: this.onChange
                    }}
                    dataSource={this.state.adminList}
                    rowKey='id'
                >
                    <Table.Column
                        title="ID" dataIndex="id" key="id"
                    />
                    <Table.Column
                        title="名称" dataIndex="name" key="name"
                    />
                    <Table.Column
                        fixed='right'
                        title="操作"
                        key="action"
                        render={(admin: IAdmin) => (
                            <Space size="middle">
                                <Permission path='editAdmin'
                                            children={<Button onClick={() => {
                                                this.editAdmin(admin)
                                            }} type='primary'>编辑</Button>}
                                />
                                <Permission
                                    path='deleteAdmin'
                                    children={<DeleteAdmin admin={admin} callback={this.deleteAdminCallback}/>}
                                />
                            </Space>
                        )}
                    />

                </Table>
            </div>
        )
    }
}

export default AdminList