import React, {Component} from "react";
import {Alert, Input, Modal, Spin, Tree} from 'antd';
import {getRoleDetail, saveRole} from "../../api/role";


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
    generatePermissionList = (permissionList: IPermission[], parentId: number = 0): IPermission[] => {
        let pl: IPermission[] = []
        permissionList.forEach((permission: IPermission) => {
            if (permission.parentId === parentId) {
                permission.key = permission.id
                permission.children = this.generatePermissionList(permissionList, permission.id)
                pl.push(permission)
            }
        })
        return pl
    }
    loadPermission = () => {
        getRoleDetail(this.props.roleId).then(response => {
            const {permissionList, permissionAll} = response.data.data
            let permissions = permissionList.map((permission: IPermission) => {
                return permission.id
            })
            this.setState({
                nodeList: this.generatePermissionList(permissionAll),
                defaultCheckedKeys: permissions,
            })

        })
    }

    componentDidMount() {
        this.loadPermission()
    }

    onCheck = (checkedKeys: any, info: any) => {
        this.setState({
            defaultCheckedKeys: checkedKeys.checked
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
                    <Alert
                        showIcon
                        message="选中子节点的时候一定要手动选中父级节点，否则不会生效"
                        type="warning"/>
                    {
                        this.state.nodeList.length > 0 ?
                            <Tree
                                defaultExpandAll
                                checkStrictly
                                showLine
                                checkable
                                treeData={this.state.nodeList}
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
