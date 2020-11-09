import React, {Component} from "react";
import {Button, Form, Input, message, Modal, Space, Tree} from "antd";
import {IRole} from "../interfaces/IRole";
import {RuleObject} from "antd/es/form";
import {getAllPermission} from "../../api/permission";
import {FormInstance} from "antd/lib/form";
import {addRole} from "../../api/role";


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
    visible: boolean
}

interface IProps {
    refresh: () => void
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class RoleAdd extends Component<IProps, IPermissionState> {
    formRef = React.createRef<FormInstance>();

    state = {
        nodeList: [],
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    cancel = () => {
        this.setState({
            visible: false
        })
        // @ts-ignore
        this.formRef.current.resetFields()
    }
    ok = () => {
        this.setState({
            visible: false
        })
    }
    addRole = (values: IRole) => {
        addRole(values).then(response => {
            const {code, msg} = response.data
            if (code === 1) {
                message.error(msg)
            } else {
                message.success(msg)
                this.setState({
                    visible: false
                })
                this.props.refresh()
            }
        })
    }
    error = (error: any) => {
    }
    loadpermissionList = () => {
        getAllPermission().then(response => {
            const {data} = response.data
            let nodeList = data.filter((permission: IPermission) => {
                permission.key = permission.id
                permission.children = data.filter((p: IPermission) => (p.parentId === permission.id))
                    .map((r: IPermission) => {
                        r.key = r.id
                        r.children = data.filter((t: IPermission) => t.parentId === r.id)
                        return r
                    })
                return permission.isMenu === 1 && permission.parentId === 0
            })
            this.setState({
                nodeList: nodeList
            })
        })
    }

    selectPermission = (checkedKeys: any, info: any) => {
        // @ts-ignore
        this.formRef.current.setFieldsValue({
            permissionList: checkedKeys
        })
    };

    componentDidMount() {
        this.loadpermissionList()
    }


    render() {
        return (
            <>
                <Button type='primary' onClick={this.showModal}>新增角色</Button>
                <Modal
                    title={'添加角色'}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.cancel}
                    onOk={this.ok}
                >
                    <Form
                        ref={this.formRef}
                        initialValues={{roleName: '', permissionList: []}}
                        onFinish={this.addRole}
                        onFinishFailed={this.error}
                    >
                        <Form.Item
                            hasFeedback
                            rules={[
                                {
                                    min: 2,
                                    max: 16,
                                    required: true,
                                    type: "string",
                                    validator: (rule: RuleObject, value) => {

                                        if (value === '') {
                                            return Promise.reject('角色名称不可以为空');
                                        }
                                        // @ts-ignore
                                        if (value.length < rule.min) {
                                            return Promise.reject(`管理员名称长度不可以小于${rule.min}位`);
                                        }
                                        // @ts-ignore
                                        if (value.length > rule.max) {
                                            return Promise.reject(`管理员名称长度不可以大于${rule.max}位`);
                                        }

                                        return Promise.resolve()
                                    }
                                }
                            ]}
                            name={'roleName'}
                            label={'角色名称'}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={'选择权限'}
                            name='permissionList'
                            rules={[
                                {
                                    type: "array",
                                    min: 1,
                                    required: true,
                                    validator: (rule, value) => {
                                        if (value.length <= 0) {
                                            return Promise.reject('至少要选择一个权限！')
                                        }
                                        return Promise.resolve()
                                    }
                                },

                            ]}
                        >
                            <Tree
                                showLine
                                checkable
                                onCheck={this.selectPermission}
                                treeData={this.state.nodeList}
                            />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type={'primary'} htmlType={'submit'}>
                                    新增
                                </Button>
                                <Button type={'primary'} htmlType={'reset'}>
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default RoleAdd