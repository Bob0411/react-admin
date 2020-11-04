import React, { Component, Fragment } from "react";
import { Space, Table, Button, message, Popconfirm } from 'antd';
import { deleteRole, getRoleList } from "../api/role";
import Permission from "./Permission";
import { default as PermissionCheck } from '../components/Permission'

interface IRole {
    id: number,
    key: number,
    roleName: string,
    createdAt: string,
    updatedAt: string
}

interface IDeleteRoleProps extends IRole {
    refresh: () => void
}

class DeleteRole extends Component<IDeleteRoleProps, any> {
    deleteRole = () => {
        deleteRole(this.props.id).then(response => {
            const { code, msg } = response.data
            if (code === 1) {
                message.error(msg)
            } else {
                message.success('删除成功')
                this.props.refresh()
            }
        })
    }

    render() {
        return (
            <Popconfirm
                onConfirm={this.deleteRole}
                onCancel={() => {
                    message.info('你取消了删除')
                }}
                title="你确定要删除么?删除后不可恢复！"
                okText="删除"
                cancelText="取消"
            >
                <Button type='primary' danger>
                    删除
                </Button>
            </Popconfirm>
        );
    }
}

interface IState {
    page: number
    perPage: number
    total: number
    role?: IRole
    roleList: IRole[]
    showP: boolean
}

class RoleList extends Component<any, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = { page: 1, roleList: [], total: 0, perPage: 15, showP: false }
    }

    onChange = (page: number) => {
        this.getRoleList(page)
    }

    getRoleList(page: number = 1) {
        getRoleList().then(response => {
            const { data } = response.data
            data.map((role: IRole) => (
                role.key = role.id
            ))
            this.setState({
                roleList: data,
            })
        })
    }


    componentDidMount() {
        this.getRoleList()
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

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '管理',
                key: 'action',
                render: (role: IRole) => (
                    <Space>
                        <PermissionCheck path='deleteRole' children={
                            <DeleteRole
                                {...role}
                                refresh={() => {
                                    this.getRoleList(this.state.page)
                                }} />
                        } />
                        <PermissionCheck path='editRole' children={
                            <Button type='primary' onClick={() => {
                                this.setState({
                                    role: role,
                                    showP: true
                                })
                            }}>编辑</Button>
                        } />
                    </Space>
                ),
            },
        ];

        return (
            <Fragment>
                {
                    this.state.showP && this.state.role ?
                        <Permission
                            roleId={this.state.role.id}
                            roleName={this.state.role.roleName}
                            callback={this.editRoleCallback} /> : ''
                }

                <Table
                    columns={columns}
                    dataSource={this.state.roleList}
                />
            </Fragment>
        );
    }
}

export default RoleList
