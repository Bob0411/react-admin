import React, { Component } from 'react'
import { Button, Space, Table, Popconfirm, message } from 'antd'
import { deleteAdmin, getAdminList } from '../api/admin'
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
    visibleDelete: boolean
}
interface IAdmin {
    id: number
}
class AdminList extends Component<any, IAdminListState> {
    state: IAdminListState = {
        adminList: [],
        page: 1,
        perPage: 15,
        total: 0,
        visibleDelete: false
    }
    componentDidMount() {
        getAdminList().then(response => {
            const { data: { currentPage, data, total, perPage } } = response.data
            this.setState({
                page: currentPage,
                adminList: data,
                total: total,
                perPage: perPage
            })
        })
    }
    deleteAdminCallback = (admin: IAdmin) => {
        this.setState({
            adminList: this.state.adminList.filter(a => a.id !== admin.id)
        })
    }
    render() {
        return (
            <div>
                <Table
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
                                    children={<Button type='primary'>编辑</Button>}
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