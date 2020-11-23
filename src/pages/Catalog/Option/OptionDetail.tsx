import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {getOptionDetail, getOptionList} from "../../../api/option";
import {Form, Input, Select} from "antd";

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

    render() {
        return (
            <>
                {
                    this.state.option ?
                        <Form
                            initialValues={{
                                name: this.state.option.name,
                                description: this.state.option.description
                            }}
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
                                                <Select.Option value={option.id}>{option.name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
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