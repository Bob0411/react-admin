import React, {Component} from "react";
import {Button, Form, Input, message, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {getOptionDetail, getOptionTypeList, updateOption} from "../../../api/option";
import {withRouter} from "react-router-dom";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

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

interface IOptionValue {
    id: number
    value: string
    sortOrder: number
}

interface IOption {
    id: number
    type: string
    name: string
    description: string
    valueList: IOptionValue[]
}

interface IState {
    optionTypeList: IOptionType[]
    type: string
    option?: IOption
}

class EditOption extends Component<any, IState> {
    state: IState = {
        optionTypeList: [],
        type: '',
    }
    optionType = new Set(['radio', 'select', 'checkbox'])

    constructor(props: any, context: any) {
        super(props, context);
        this.getOptionTypeList()
        this.getOptionDetail()
    }

    saveOption = (value: any) => {
        console.log(value)
        let optionId = this.props.match.params.optionId;
        updateOption(optionId, value).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('更新成功')
                this.props.history.goBack()
            } else {
                message.error(msg)
            }
        })
    }


    getOptionDetail = () => {
        // @ts-ignore
        let optionId = this.props.match.params.optionId;
        getOptionDetail(optionId).then(response => {
            const {data} = response.data
            this.setState({
                option: data,
                type: data.type
            })
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
                {
                    this.state.option ?
                        <Form
                            {...layout}
                            initialValues={{
                                name: this.state.option?.name,
                                description: this.state.option?.description,
                                valueList: this.state.option.valueList,
                                type: this.state.option?.type,
                            }}
                            onFinish={this.saveOption}
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
                                                        <Select.Option value={ot.type}
                                                                       key={ot.id}>{ot.name}</Select.Option>
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
                                                                    required: true,
                                                                    message: '排序必须为整数'
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
                                <Button type='primary' htmlType='submit'>更新</Button>
                            </Form.Item>
                        </Form>
                        :
                        null
                }

            </>
        )
    }
}

export default withRouter(EditOption)