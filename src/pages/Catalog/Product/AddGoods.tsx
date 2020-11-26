import React, {Component} from "react";
import {Button, Col, Form, InputNumber, message, Row, Select, Tabs} from "antd";
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
        let optionMap = this.state.optionMap
        if (optionMap.has(optionId + '')) {
            this.setState({
                key: optionId + '',
            });
        } else {
            getOptionDetail(optionId).then(response => {
                const {valueList} = response.data.data
                optionMap.set(optionId + '', valueList)
                this.setState({
                    key: optionId + '',
                    optionMap: optionMap,
                });
            })

        }

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
                                        name={['optionList', index]}
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
                                                <Row>
                                                    <Col md={5}>
                                                        选项
                                                    </Col>
                                                    <Col md={4}>
                                                        库存
                                                    </Col>
                                                    <Col md={4}>
                                                        减库存数
                                                    </Col>
                                                    <Col md={4}>
                                                        加价金额
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Row>
                                                {fields.map(field => (
                                                    <Row
                                                        key={field.key}
                                                    >
                                                        <Col
                                                            md={5}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'option_value_id']}
                                                                fieldKey={[field.fieldKey, 'option_value_id']}
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
                                                                            if (value === null) {
                                                                                return Promise.reject('库存需>=0');
                                                                            }
                                                                            if (value >= 0) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            return Promise.reject('库存需>=0');
                                                                        }
                                                                    }
                                                                ]}
                                                            >
                                                                <InputNumber min={0} placeholder="库存"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col
                                                            md={4}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'sub_stock']}
                                                                fieldKey={[field.fieldKey, 'sub_stock']}
                                                                rules={[
                                                                    {
                                                                        type: "number",
                                                                        min: 0,
                                                                        validator: (rule, value) => {
                                                                            if (value === null) {
                                                                                return Promise.reject('减库存数>=0');
                                                                            }
                                                                            if (value >= 0) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            return Promise.reject('减库存数>=0');
                                                                        }
                                                                    }
                                                                ]}
                                                            >
                                                                <InputNumber placeholder="减库存数" min={0}/>
                                                            </Form.Item>
                                                        </Col>

                                                        <Col
                                                            md={4}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                name={[field.name, 'add_price']}
                                                                fieldKey={[field.fieldKey, 'add_price']}
                                                                rules={[
                                                                    {
                                                                        type: "number",
                                                                        min: 0,
                                                                        validator: (rule, value) => {
                                                                            if (value === null) {
                                                                                return Promise.reject('加价金额>=0');
                                                                            }
                                                                            if (value >= 0) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            return Promise.reject('加价金额>=0');
                                                                        }
                                                                    }
                                                                ]}
                                                            >
                                                                <InputNumber min={0} step={0.01} placeholder="是否加减价格"/>
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