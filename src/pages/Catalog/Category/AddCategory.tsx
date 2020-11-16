import React, {Component} from "react";
import {Form, Input, Switch, Tabs} from 'antd';
import TextArea from "antd/lib/input/TextArea";

const {TabPane} = Tabs;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

class AddCategory extends Component<any, any> {
    render() {
        return (
            <>
                <Form
                    {...layout}
                >
                    <Tabs defaultActiveKey="2">
                        <TabPane tab="通用信息" key="1">
                            <Form.Item label='分类名称'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='描述'>
                                <TextArea/>
                            </Form.Item>
                            <Form.Item label='Meta Tag Title'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='Meta Tag Description'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='Meta Tag Keywords'>
                                <Input/>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="参数" key="2">
                            <Form.Item label='父级分类'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='图片'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='状态'>
                                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                            </Form.Item>
                        </TabPane>
                    </Tabs>
                </Form>
            </>
        );
    }
}

export default AddCategory