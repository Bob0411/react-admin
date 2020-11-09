import React, {Component} from "react";
import {Button, Form, Input, Modal, Space} from "antd";
import {IRole} from "../interfaces/IRole";
import {RuleObject} from "antd/es/form";

interface IRoleAddState {
    visible: boolean
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class RoleAdd extends Component<any, IRoleAddState> {
    state: IRoleAddState = {
        visible: true
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
    }
    ok = () => {
        this.setState({
            visible: false
        })
    }
    addRole = (values: IRole) => {
        console.log(values)
    }
    error = (error: any) => {
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
                        initialValues={{roleName: ''}}
                        onFinish={this.addRole}
                        onFinishFailed={this.error}
                    >
                        <Form.Item
                            hasFeedback
                            rules={[
                                {
                                    min: 2,
                                    type: "string",
                                    validator: (rule: RuleObject, value) => {
                                        // @ts-ignore
                                        if (value.length < rule.min) {
                                            return Promise.reject(`管理员名称长度不可以小于${rule.min}位`);
                                        }
                                        return Promise.resolve()
                                    }
                                },
                                {
                                    max: 16,
                                    type: "string",
                                    validator: (rule: RuleObject, value) => {
                                        // @ts-ignore
                                        if (value.length > rule.max) {
                                            return Promise.reject(`管理员名称长度不可以大于${rule.max}位`);
                                        }
                                        return Promise.resolve()
                                    }
                                },
                                {
                                    type: "string",
                                    required: true,
                                    validator: (rule: RuleObject, value) => {
                                        if (value.length <= 0) {
                                            return Promise.reject('角色名称不可以为空');
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