import React, {Component} from "react";
import {Button, Col, Form, Input, message, Row, Select, Tabs} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

class AddGoods extends Component<any, any> {
    render() {
        return (
            <>
                <Tabs tabPosition='left'>
                    <TabPane tab="Tab 1" key="1">
                        <Form.List
                            name="valueList"
                            rules={[
                                {
                                    validator: (rule, value) => {
                                        if (value.length === 0) {
                                            message.warning('至少添加一个选项')
                                            return Promise.reject('至少添加一个选项');
                                        } else {
                                            return Promise.resolve()
                                        }
                                    }
                                }
                            ]}
                        >

                            {(fields, {add, remove}) => (
                                <>
                                    <Row gutter={1}>
                                        <Col md={4}>
                                            选项
                                        </Col>
                                        <Col md={4}>
                                            库存
                                        </Col>
                                        <Col md={4}>
                                            减库存
                                        </Col>
                                        <Col md={4}>
                                            价格
                                        </Col>
                                        <Col md={4}>
                                        </Col>
                                    </Row>
                                    {fields.map(field => (
                                        <Row
                                            gutter={2}
                                            key={field.key}
                                        >
                                            <Col
                                                md={4}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'option']}
                                                    fieldKey={[field.fieldKey, 'option']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '选项值不可以为空'
                                                        }
                                                    ]}
                                                >
                                                    <Select placeholder='选择一项'>
                                                        <Select.Option value='1'>Red</Select.Option>
                                                        <Select.Option value='2'>Blue</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                md={4}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'quantity']}
                                                    fieldKey={[field.fieldKey, 'quantity']}
                                                    rules={[
                                                        {
                                                            type: "number",
                                                            min: 0,
                                                            validator: (rule, value) => {
                                                                if (value >= 0) {
                                                                    return Promise.resolve()
                                                                }
                                                                return Promise.reject('库存必须为大于0的整数');
                                                            }
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="库存" allowClear/>
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                md={4}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'delta']}
                                                    fieldKey={[field.fieldKey, 'delta']}
                                                    rules={[
                                                        {
                                                            type: "number",
                                                            min: 0,
                                                            validator: (rule, value) => {
                                                                if (value >= 0) {
                                                                    return Promise.resolve()
                                                                }
                                                                return Promise.reject('库存必须为大于0的整数');
                                                            }
                                                        }
                                                    ]}
                                                >
                                                    <Select placeholder='是否减库存'>
                                                        <Select.Option value={0}>否</Select.Option>
                                                        <Select.Option value={1}>是</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col
                                                md={4}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'price']}
                                                    fieldKey={[field.fieldKey, 'price']}
                                                    rules={[
                                                        {
                                                            type: "number",
                                                            min: 0,
                                                            validator: (rule, value) => {
                                                                if (value >= 0) {
                                                                    return Promise.resolve()
                                                                }
                                                                return Promise.reject('库存必须为大于0的整数');
                                                            }
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="是否加减价格" allowClear/>
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                md={4}
                                            >
                                                <Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                            添加选项
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab 3
                    </TabPane>
                </Tabs>
            </>
        )
    }
}

export default AddGoods