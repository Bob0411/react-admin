import React, {Component} from "react";
import {Button, Form, Input, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

class AddOption extends Component<any, any> {
    addOption = (value: any) => {
        console.log(value)
    }

    render() {
        return (
            <>
                <Form
                    initialValues={{
                        name: '',
                        description: '',
                        optionList: [],
                        type: '1',
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
                        <Select>
                            <Select.OptGroup label="选择框">
                                <Select.Option value="1">单选框</Select.Option>
                                <Select.Option value="2">多选框</Select.Option>
                                <Select.Option value="3">下拉框</Select.Option>
                            </Select.OptGroup>
                            <Select.OptGroup label="输入框">
                                <Select.Option value="4">文本框</Select.Option>
                                <Select.Option value="5">文本域</Select.Option>
                            </Select.OptGroup>
                            <Select.OptGroup label="日期">
                                <Select.Option value="6">日期</Select.Option>
                                <Select.Option value="7">时间</Select.Option>
                                <Select.Option value="8">日期&时间</Select.Option>
                            </Select.OptGroup>
                        </Select>
                    </Form.Item>

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
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>添加</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

export default AddOption