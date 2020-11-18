import React, {Component} from "react";
import {Button, Form, Input, message, Select, Switch, Tabs} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import {addCategory} from "../../../api/productCategory";

const {TabPane} = Tabs;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const {Option, OptGroup} = Select;

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
                    initialValues={{category_name: '', description: '', status: true, parentId: '2'}}
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
                                name={'parentId'}
                                label='父级分类'
                                valuePropName='defaultValue'
                            >
                                <Select>
                                    <OptGroup label="Manager">
                                        <Option value="1">Jack</Option>
                                        <Option value="2">Lucy</Option>
                                    </OptGroup>
                                    <OptGroup label="Engineer">
                                        <Option value="3">yiminghe</Option>
                                    </OptGroup>
                                </Select>
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