import React, {Component} from "react";
import {Button, Form, Input, message, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {addOption, getOptionTypeList} from "../../../api/option";
import {withRouter} from "react-router-dom";


const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IOptionType {
    name: string
    id: number
    parentId: number
    type: string
    children: IOptionType[]
}

interface IState {
    optionTypeList: IOptionType[]
    type: string
}

class AddOption extends Component<any, IState> {
    state: IState = {
        optionTypeList: [],
        type: ''
    }
    optionType = new Set(['radio', 'select', 'checkbox'])

    constructor(props: any, context: any) {
        super(props, context);
        this.getOptionTypeList()
    }

    addOption = (value: any) => {
        addOption(value).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('添加成功')
                this.props.history.goBack()
            } else {
                message.error(msg)
            }
        })
    }
    getOptionTypeList = () => {
        getOptionTypeList().then(response => {
            const {data} = response.data
            this.setState({
                optionTypeList: data
            })
        })
    }
    selectChange = (value: any) => {
        this.setState({
            type: value
        })
    }

    render() {
        return (
            <>
                <Form
                    initialValues={{
                        name: '',
                        description: '',
                        valueList: [],
                        type: null,
                    }}
                    onFinish={this.addOption}
                >
                    <Form.Item
                        name='name'
                        label='名称'
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: '名称不可以为空'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label='描述'
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: '描述不可以为空'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='type'
                        label='类型'
                        rules={[
                            {
                                type: "string",
                                required: true,
                                message: '类型不可以为空'
                            }
                        ]}
                        valuePropName='value'
                    >
                        <Select
                            onChange={this.selectChange}
                            placeholder='选择类型'
                        >
                            {
                                this.state.optionTypeList.map((optionType: IOptionType) => (
                                    <Select.OptGroup label={optionType.name} key={optionType.id}>
                                        {
                                            optionType.children.map((ot: IOptionType) => (
                                                <Select.Option value={ot.type} key={ot.id}>{ot.name}</Select.Option>
                                            ))
                                        }
                                    </Select.OptGroup>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {
                        this.optionType.has(this.state.type) ?
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
                                        {fields.map(field => (
                                            <Space key={field.key} style={{display: 'flex', marginBottom: 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {...field}
                                                    label='选项值'
                                                    name={[field.name, 'value']}
                                                    fieldKey={[field.fieldKey, 'first']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '选项值不可以为空'
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="选项名称" allowClear/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    label='排序'
                                                    name={[field.name, 'sortOrder']}
                                                    fieldKey={[field.fieldKey, 'last']}
                                                    rules={[
                                                        {
                                                            type: "number",
                                                            min: 0,
                                                            validator: (rule, value) => {
                                                                if (value >= 0) {
                                                                    return Promise.resolve()
                                                                }
                                                                return Promise.reject('排序必须为大于0的整数');
                                                            }
                                                        }
                                                    ]}
                                                >
                                                    <Input placeholder="选项值" allowClear/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                                                添加选项
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            :
                            null
                    }
                    <Form.Item
                        {...tailLayout}
                    >
                        <Button type='primary' htmlType='submit'>添加</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default withRouter(AddOption)