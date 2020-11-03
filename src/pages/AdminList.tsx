import React, { Component } from 'react'
import { Button, Space, Table, Popconfirm, message, Modal, Form, Input } from 'antd'
import { deleteAdmin, getAdminList, updateAdmin } from '../api/admin'
import Permission from '../components/Permission'
interface IDeleteAdminPropos {
    admin: IAdmin
    callback: (admin: IAdmin) => void
}
interface IDeleteAdminState {
    visibleDelete: boolean
}
class DeleteAdmin extends Component<IDeleteAdminPropos, IDeleteAdminState> {
    state: IDeleteAdminState = {
        visibleDelete: false
    }
    deleteAdmin = () => {
        this.setState({
            visibleDelete: true
        })
    }
    confirm = () => {
        this.setState({
            visibleDelete: false
        })
        if (this.props.admin) {
            deleteAdmin(this.props.admin.id).then(response => {
                const { code, msg } = response.data
                if (code === 0) {
                    message.success('删除成功！')
                    this.props.callback(this.props.admin)
                } else {
                    message.warn(msg)
                }
            })
        }
    }
    cancel = () => {
        this.setState({
            visibleDelete: false
        })
        message.info('你取消了删除！')
    }
    render() {
        return (
            <div>
                <Popconfirm title='你确定要删除管理员吗？删除后不可以恢复！'
                    visible={this.state.visibleDelete}
                    okText="删除"
                    placement="topRight"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    cancelText="取消"
                >
                    <Button type='primary' onClick={this.deleteAdmin} danger>删除</Button>
                </Popconfirm>
            </div>
        )
    }
}
interface IAdminListState {
    adminList: IAdmin[]
    admin?: IAdmin
    page: number
    perPage: number
    total: number
    visible: boolean
}
interface IAdmin {
    id: number
    name: string
    password: string
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
class AdminList extends Component<any, IAdminListState> {
    state: IAdminListState = {
        adminList: [],
        page: 1,
        perPage: 15,
        total: 0,
        visible: false
    }
    componentDidMount() {
        this.getAdminList()
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
            updateAdmin(this.state.admin?.id, admin).then(response => {
                const { code, msg } = response.data
                if (code === 0) {
                    message.success(msg)
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
            const { data: { currentPage, data, total, perPage } } = response.data
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
                                initialValues={{ name: this.state.admin?.name, password: '' }}
                                onFinish={this.saveAdmin}
                                onFinishFailed={this.saveFailed}
                            >
                                <Form.Item
                                    label="管理员名称"
                                    name="name"
                                    rules={[{ required: true, message: '请输入管理员名称' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="管理员密码"
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
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                </Button>
                                        <Button type='dashed' htmlType="reset">
                                            重置
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
                                    children={<Button onClick={() => { this.editAdmin(admin) }} type='primary'>编辑</Button>}
                                />
                                <Permission
                                    path='deleteAdmin'
                                    children={<DeleteAdmin admin={admin} callback={this.deleteAdminCallback} />}
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