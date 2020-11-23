import React, {Component} from "react";
import {Button, Space, Table} from "antd";
import {getOptionList} from "../../../api/option";
import {Link} from "react-router-dom";

interface IOption {
    id: number
    type: string
}

interface IState {
    optionList: IOption[]
}

class OptionList extends Component<any, IState> {
    state: IState = {
        optionList: []
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getOptionList()
    }

    getOptionList = () => {
        getOptionList().then(response => {
            const {data} = response.data
            this.setState({
                optionList: data
            })
        })
    }
    deleteOption = (optionId: number) => {

    }

    render() {
        return (
            <>
                <Link to='/admin/option/add'>
                    <Button type='primary'>添加选项</Button>
                </Link>
                <Table
                    dataSource={this.state.optionList}
                >
                    <Table.Column
                        title={'id'}
                        dataIndex={'id'}
                    />
                    <Table.Column
                        title={'类型'}
                        dataIndex={'type'}
                    />
                    <Table.Column
                        title={'管理'}
                        render={(option: IOption) => {
                            return (
                                <Space>
                                    <Link to={`/admin/option/detail/${option.id}`}>
                                        <Button type='primary'>编辑</Button>
                                    </Link>
                                    <Button type='primary' danger>删除</Button>
                                </Space>
                            )
                        }}
                    />
                </Table>
            </>
        )
    }
}

export default OptionList