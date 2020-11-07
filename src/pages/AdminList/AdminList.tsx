import React, {Component} from 'react'
import {Button, Space, Table} from 'antd'
import {getAdminList} from '../../api/admin'
import Permission from '../../components/Permission'
import {getRoleList} from '../../api/role'
import DeleteAdmin from "./DeleteAdmin";
import {IAdmin} from "../../store/states/AdminState";
import {IRole} from "../interfaces/IRole";
import EditAdmin from './EditAdmin'


interface IAdminListState {
    adminList: IAdmin[]
    roleList: IRole[]
    admin?: IAdmin
    page: number
    perPage: number
    total: number
    visible: boolean
}


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
    editAdmin = (admin: IAdmin) => {
        this.getRoleList()
        this.setState({
            admin: admin
        })
        this.setState({
            visible: true
        })
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
    editAdminCallback = (admin: IAdmin) => {
        this.setState({
            visible: false,
            adminList: this.state.adminList.map((a) => {
                if (a.id === admin.id) {
                    return admin
                }
                return a
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.visible && this.state.admin ?
                        <EditAdmin admin={this.state.admin} callback={this.editAdminCallback}/>
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
                                            children={
                                                <Button onClick={() => {
                                                    this.editAdmin(admin)
                                                }} type='primary'>编辑</Button>
                                            }
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