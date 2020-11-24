import React, {Component} from "react";
import {Button, Form, Input, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {getOptionTypeList} from "../../../api/option";

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
        console.log(value)
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
        console.log(value)
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
                        optionList: [],
                        type: '',
                    }}
                    onFinish={this.addOption}
                >
                    <Form.Item
                        name='name'
                        label='名称'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label='描述'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='type'
                        label='类型'
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
                            <Form.List name="optionList">
                                {(fields, {add, remove}) => (
                                    <>
                                        {fields.map(field => (
                                            <Space key={field.key} style={{display: 'flex', marginBottom: 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {...field}
                                                    label='选项名称'
                                                    name={[field.name, 'optionName']}
                                                    fieldKey={[field.fieldKey, 'first']}
                                                    rules={[{required: true, message: '选项名称'}]}
                                                >
                                                    <Input placeholder="选项名称" allowClear/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    label='选项值'
                                                    name={[field.name, 'optionValue']}
                                                    fieldKey={[field.fieldKey, 'last']}
                                                    rules={[{required: true, message: '选项值'}]}
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
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>添加</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default AddOption