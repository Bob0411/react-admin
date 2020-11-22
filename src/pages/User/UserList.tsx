import React, {Component} from "react";
import {getUserList} from "../../api/user";
import {Button, DatePicker, Form, Input, Space, Table} from "antd";
import DeleteUser from "./DeleteUser";
import Permission from "../../components/Permission";
import moment from "moment";

const {RangePicker} = DatePicker;

interface IUser {
    id: number
    name: string
    mobile: string
}

interface IState {
    userList: IUser[]
    total: number
    perPage: number
    currentPage: number
    loading: boolean
}

class UserList extends Component<any, IState> {
    state: IState = {
        total: 0,
        perPage: 15,
        currentPage: 1,
        loading: true,
        userList: []
    }

    constructor(props: any, context: any) {
        super(props, context);
        this.getUserList()
    }

    onChange = (page: number = 1) => {
        this.getUserList(page)
    }
    getUserList = (page: number = 1, search: any = '') => {
        getUserList(page, search).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                userList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage,
                loading: false
            })
        })
    }
    deleteUser = (userId: number) => {
        this.setState({
            userList: this.state.userList.filter((user: IUser) => user.id !== userId)
        })
    }
    search = (search: any) => {
        this.setState({
            loading: true
        })
        let date = {}
        if (search.date.length === 2) {
            date = {
                startDate: search.date[0].format('YYYY-MM-DD'),
                endDate: search.date[1].format('YYYY-MM-DD'),
            }
        }
        this.getUserList(
            1,
            {
                name: search.name,
                mobile: search.mobile,
                ...date
            }
        )
    }

    render() {
        return (
            <>
                <Form
                    initialValues={{
                        name: '',
                        mobile: '',
                        date: []
                    }}
                    onFinish={this.search}
                    layout={"inline"}
                >
                    <Form.Item
                        name='name'
                        label='姓名'
                    >
                        <Input placeholder='输入姓名查询' allowClear/>
                    </Form.Item>
                    <Form.Item
                        name='mobile'
                        label='手机号'
                    >
                        <Input placeholder='输入手机号查询' allowClear/>
                    </Form.Item>
                    <Form.Item
                        label='注册日期'
                        name='date'
                        valuePropName='value'
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Form>

                <Table
                    dataSource={this.state.userList}
                    scroll={{x: 1000}}
                    rowKey='id'
                    loading={this.state.loading}
                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        pageSize: this.state.perPage,
                        total: this.state.total,
                        current: this.state.currentPage,
                        onChange: this.onChange,
                        showSizeChanger: false
                    }}
                >
                    <Table.Column
                        title='id'
                        dataIndex={'id'}
                    />
                    <Table.Column
                        title='姓名'
                        dataIndex={'name'}
                    />
                    <Table.Column
                        title='电话'
                        dataIndex={'mobile'}
                    />
                    <Table.Column
                        title='注册日期'
                        dataIndex={'createdAt'}
                        render={(createdAt) =>
                            <>
                                {moment(createdAt).format('YYYY-MM-DD  HH:MM:SS')}
                            </>
                        }
                    />
                    <Table.Column
                        fixed='right'
                        title='管理'
                        render={(user: IUser) => {
                            return (
                                <Space>
                                    <Button type='primary'>编辑</Button>
                                    <Permission path='deleteUser'>
                                        <DeleteUser userId={user.id} callback={this.deleteUser}/>
                                    </Permission>
                                </Space>
                            )
                        }}
                    />
                </Table>
            </>
        )
    }
}

export default UserList