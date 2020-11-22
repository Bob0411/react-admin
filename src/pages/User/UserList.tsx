import React, {Component} from "react";
import {getUserList} from "../../api/user";
import {Button, Space, Table} from "antd";
import DeleteUser from "./DeleteUser";
import Permission from "../../components/Permission";

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
    getUserList = (page: number = 1) => {
        getUserList(page).then(response => {
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

    render() {
        return (
            <>
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