import React, {Component} from "react";
import {Button, Col, Form, Input, message, Row, Select, Tabs} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {getOptionDetail, getOptionList} from "../../../api/option";

const {TabPane} = Tabs;

interface IOptionValue {
    id: number
    optionId: number
    value: string
}

interface IOption {
    id: number
    type: string
    name: string
}

interface IState {
    optionList: IOption[]
    optionMap: Map<string, IOptionValue[]>
    key: string
}

class AddGoods extends Component<any, IState> {
    state: IState = {
        optionList: [],
        optionMap: new Map<string, IOptionValue[]>(),
        key: '0'
    }

    constructor(props: any, context: any) {
        super(props, context);
        this.getOptionList()
    }

    getOptionList = () => {
        getOptionList().then(response => {
            const {data} = response.data
            this.getOptionDetail(data[0].id)
            this.setState({
                optionList: data
            })
        })
    }

    getOptionDetail = (optionId: number) => {
        getOptionDetail(optionId).then(response => {
            const {valueList} = response.data.data
            let optionMap = this.state.optionMap
            optionMap.set(optionId + '', valueList)
            this.setState({
                key: optionId + '',
                optionMap: optionMap,
            });
        })
    }

    changeOption = (key: any) => {
        this.getOptionDetail(key)
    }

    render() {
        return (
            <>
                <Tabs
                    activeKey={this.state.key}
                    tabPosition='left'
                    onChange={this.changeOption}
                >
                    {
                        this.state.optionList.map((option: IOption, index) => (
                            <TabPane tab={option.name} key={option.id}>
                                {
                                    <Form.List
                                        name={`valueList[${index}]`}
                                        rules={[
                                            {
                                                validator: (rule, value) => {
                                                    if (value === undefined || value.length === 0) {
                                                        message.warning('至少添加一个选项');
                                                        return Promise.reject('至少添加一个选项');
                                                    } else {
                                                        return Promise.resolve();
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
                                                        加价
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
                                                                valuePropName='value'
                                                            >
                                                                <Select placeholder='选择一项'>
                                                                    {
                                                                        this.state.optionMap.get(option.id + '')?.map((v) => (
                                                                            <Select.Option
                                                                                value={v.id}
                                                                                key={v.id}
                                                                            >
                                                                                {v.value}
                                                                            </Select.Option>
                                                                        ))
                                                                    }
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
                                                                            return Promise.reject('库存需>0');
                                                                        }
                                                                    }
                                                                ]}
                                                            >
                                                                <Input placeholder="库存" allowClear/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col
                                                            md={5}
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
                                                                            return Promise.reject('输入值要大于等于0');
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
                                                            md={5}
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
                                                                <MinusCircleOutlined
                                                                    onClick={() => remove(field.name)}/>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()}
                                                            icon={<PlusOutlined/>}>
                                                        添加选项
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                }
                            </TabPane>
                        ))
                    }
                </Tabs>
            </>
        )
    }
}

export default AddGoods