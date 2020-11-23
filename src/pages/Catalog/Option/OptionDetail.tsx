import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {getOptionDetail, getOptionList} from "../../../api/option";
import {Button, Form, Input, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

interface IProps extends RouteComponentProps {
    optionId?: number
    callback?: (optionId: number) => void
}

interface IOptionValue {

}

interface IOption {
    id: number
    type: string
    name: string
    description: string
    valueList: IOptionValue[]
}

interface IState {
    option?: IOption
    optionList: IOption[]
}

class OptionDetail extends Component<IProps, IState> {
    state: IState = {
        optionList: []
    }

    constructor(props: IProps, context: any) {
        super(props, context);
        this.getOptionDetail()
        this.getOptionList()
    }

    getOptionDetail = () => {
        // @ts-ignore
        let optionId = this.props.match.params.optionId;
        getOptionDetail(optionId).then(response => {
            const {data} = response.data
            this.setState({
                option: data
            })
        })
    }

    getOptionList = () => {
        getOptionList().then(response => {
            const {data} = response.data
            this.setState({
                optionList: data
            })
        })
    }
    getFormValue = (value: any) => {
        console.log(value)
    }

    render() {
        return (
            <>
                {
                    this.state.option ?
                        <Form
                            initialValues={{
                                name: this.state.option.name,
                                description: this.state.option.description,
                            }}
                            onFinish={this.getFormValue}
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
                                name='description'
                                label='类型'
                            >
                                <Select>
                                    {
                                        this.state.optionList.map((option: IOption) => {
                                            return (
                                                <Select.Option
                                                    value={option.id}
                                                    key={option.id}
                                                >
                                                    {option.name}
                                                </Select.Option>
                                            )
                                        })
                                    }
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
                                <Button type='primary' htmlType='submit'>确定</Button>
                            </Form.Item>
                        </Form>
                        :
                        null
                }
            </>
        )
    }
}

export default withRouter(OptionDetail)