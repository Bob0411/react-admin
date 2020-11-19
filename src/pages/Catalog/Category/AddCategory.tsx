import React, {Component} from "react";
import {Button, Form, Input, message, Switch, Tabs} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import {addCategory} from "../../../api/category";
import {TreeSelect} from 'antd';

const {TreeNode} = TreeSelect;

const {TabPane} = Tabs;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

class AddCategory extends Component<any, any> {
    addCategory = (category: any) => {
        addCategory(category).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('添加成功！')
            } else {
                message.error(msg)
            }
        })
    }

    render() {
        return (
            <>
                <Form
                    onFinish={this.addCategory}
                    initialValues={{category_name: '', description: '', status: true, parent_id: undefined}}
                    {...layout}
                >
                    <Tabs defaultActiveKey="2">
                        <TabPane tab="通用信息" key="1">
                            <Form.Item
                                name={'category_name'}
                                label='分类名称'
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: '分类名称不可以为空'
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name={'description'}
                                label='描述'
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: '描述不可以为空'
                                    }
                                ]}
                            >
                                <TextArea/>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="参数" key="2">
                            <Form.Item
                                name={'parent_id'}
                                label='父级分类'
                                valuePropName='value'
                            >
                                <TreeSelect
                                    showSearch
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    placeholder="Please select"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    <TreeNode value="parent 1" title="parent 1">
                                        <TreeNode value="parent 1-0" title="parent 1-0">
                                            <TreeNode value="leaf1" title="my leaf"/>
                                            <TreeNode value="leaf2" title="your leaf"/>
                                        </TreeNode>
                                        <TreeNode value="parent 1-1" title="parent 1-1">
                                            <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>}/>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeSelect>
                            </Form.Item>
                            <Form.Item
                                label='状态'
                                name={'status'}
                                valuePropName='checked'
                            >
                                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                            </Form.Item>
                        </TabPane>
                    </Tabs>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>新增</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default AddCategory