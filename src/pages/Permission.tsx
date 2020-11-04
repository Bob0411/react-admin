import React, {Component} from "react";
import {Tree, Spin, Modal, Input} from 'antd';
import {getRoleDetail, saveRole} from "../api/role";


interface IPermission {
    id: number
    key: number
    isMenu: number
    parentId: number
    path: string
    title: string
    children: IPermission[]
}

interface IPermissionState {
    nodeList: IPermission[]
    defaultCheckedKeys: number[]
    defaultSelectedKeys: number[]
    defaultExpandedKeys: number[]
    visible: boolean
    roleName: string
}

interface IProps {
    roleId: number
    roleName: string
    callback: (roleName?: string) => void
}

class Permission extends Component<IProps, IPermissionState> {
    state = {
        nodeList: [],
        defaultCheckedKeys: [],
        defaultExpandedKeys: [],
        defaultSelectedKeys: [],
        visible: true,
        roleName: this.props.roleName
    }

    loadPermission = () => {
        getRoleDetail(this.props.roleId).then(response => {
            const {permissionList, permissionAll} = response.data.data
            let permissions = permissionList.map((permission: IPermission) => {
                return permission.id
            })

            let permissionMap = new Map()
            permissionAll.filter((permission: IPermission) => {
                permission.key = permission.id
                return permission.isMenu === 1 && permission.parentId > 0
            }).forEach((permission: IPermission) => {
                permission.key = permission.id
                if (permissionMap.has(permission.parentId)) {
                    let permissionList: IPermission[] = permissionMap.get(permission.parentId)
                    permissionList.push(permission)
                    permissionMap.set(permission.parentId, permissionList)
                } else {
                    let permissionList: IPermission[] = []
                    permissionList.push(permission)
                    permissionMap.set(permission.parentId, permissionList)
                }
            })


            let nodeList = permissionAll.filter((permission: IPermission) => {
                return permission.isMenu === 1 && permission.parentId === 0
            }).map((permission: IPermission) => {
                permission.key = permission.id
                if (permissionMap.has(permission.id)) {
                    permission.children = permissionMap.get(permission.id)
                } else {
                    permission.children = []
                }
                return permission
            })

            this.setState({
                nodeList: nodeList,
                defaultCheckedKeys: permissions,
                defaultExpandedKeys: [],
                defaultSelectedKeys: []
            })

        })
    }

    componentDidMount() {
        this.loadPermission()
    }

    onCheck = (checkedKeys: any, info: any) => {
        this.setState({
            defaultCheckedKeys: checkedKeys
        })
    };

    handleOk = () => {
        saveRole(this.props.roleId, this.state.roleName, this.state.defaultCheckedKeys)
        this.setState({
            visible: false
        })
        this.props.callback(this.state.roleName)
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <>
                <Modal
                    afterClose={this.props.callback}
                    okText='确认'
                    cancelText='取消'
                    title={`修改角色`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input
                        defaultValue={this.props.roleName}
                        onChange={(e) => {
                            this.setState({
                                roleName: e.target.value
                            })
                        }}
                    />
                    {
                        this.state.nodeList.length > 0 ?
                            <Tree
                                checkable
                                treeData={this.state.nodeList}
                                defaultExpandedKeys={this.state.defaultExpandedKeys}
                                defaultSelectedKeys={this.state.defaultSelectedKeys}
                                defaultCheckedKeys={this.state.defaultCheckedKeys}
                                onCheck={this.onCheck}
                            />
                            :
                            <Spin size="large"/>
                    }
                </Modal>
            </>
        );
    }
}

export default Permission
