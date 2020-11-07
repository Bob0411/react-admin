import React, {Component, Fragment} from "react";
import {Space, Table, Button} from 'antd';
import {getRoleList} from "../../api/role";
import Permission from "../Permission";
import {default as PermissionCheck} from '../../components/Permission'
import {IRole} from "../interfaces/IRole";
import DeleteRole from "./DeleteRole";


interface IState {
    page: number
    perPage: number
    total: number
    role?: IRole
    roleList: IRole[]
    showP: boolean
}

class RoleList extends Component<any, IState> {
    state: IState = {page: 1, roleList: [], total: 0, perPage: 15, showP: false}

    constructor(props: any) {
        super(props);
        this.getRoleList()
    }

    onChange = (page: number) => {
        this.getRoleList(page)
    }

    getRoleList(page: number = 1) {
        getRoleList().then(response => {
            const {data} = response.data
            this.setState({
                roleList: data,
            })
        })
    }

    editRoleCallback = (roleName?: string) => {
        this.setState({
            showP: false
        })
        this.state.roleList.map((role) => {
            if (role.id === this.state.role?.id) {
                if (roleName) {
                    role.roleName = roleName
                }
            }
            return role
        })
        this.setState({})
    }
    deleteRoleCallback = (role: IRole) => {
        this.setState({
            roleList: this.state.roleList.filter((r: IRole) => r.id !== role.id)
        })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.showP && this.state.role ?
                        <Permission
                            roleId={this.state.role.id}
                            roleName={this.state.role.roleName}
                            callback={this.editRoleCallback}/> : ''
                }
                <Table
                    rowKey={'id'}
                    dataSource={this.state.roleList}
                >
                    <Table.Column
                        title='ID'
                        dataIndex='id'
                        key='id'

                    />
                    <Table.Column
                        title='角色名称'
                        dataIndex='roleName'
                        key='roleName'
                    />
                    <Table.Column
                        title='管理'
                        key='action'
                        render={(role: IRole) => {
                            return (
                                <Space>
                                    <PermissionCheck path='deleteRole'>
                                        <DeleteRole
                                            {...role}
                                            role={role}
                                            deleteRoleCallback={this.deleteRoleCallback}
                                        />
                                    </PermissionCheck>
                                    <PermissionCheck path='editRole'>
                                        <Button type='primary' onClick={() => {
                                            this.setState({
                                                role: role,
                                                showP: true
                                            })
                                        }}>编辑</Button>
                                    </PermissionCheck>
                                </Space>
                            )
                        }}
                    />
                </Table>
            </Fragment>
        )
    }
}

export default RoleList
