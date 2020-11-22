import React, {Component} from "react";
import {Button, DatePicker, Form, Input, Space, Table} from "antd";
import {getOrderList} from "../../api/order";
import moment from "moment";

const {RangePicker} = DatePicker;

interface IUser {
    id: number
    name: string
    mobile: string
}

interface IAddress {
    name: string
    mobile: string
    address: string
}

interface IOrder {
    id: number
    orderNumber: string
    originalPrice: number
    tradePrice: number
    user: IUser
    address: IAddress
}

interface IState {
    orderList?: IOrder[]
    total: number
    perPage: number
    currentPage: number
    loading: boolean
}

class OrderList extends Component<any, IState> {
    state: IState = {
        total: 0,
        perPage: 15,
        currentPage: 1,
        loading: true,
        orderList: []
    }

    constructor(props: any) {
        super(props);
        this.getOrderList()
    }

    getOrderList = (page: number = 1, keyword: any = {}) => {
        getOrderList(page, keyword).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                orderList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage,
                loading: false
            })
        })
    }
    onChange = (page: number = 1) => {
        this.getOrderList(page)
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
        this.getOrderList(
            1,
            {
                orderNumber: search.orderNumber,
                mobile: search.mobile,
                ...date
            }
        );
    }

    render() {
        return (
            <>
                <Form
                    initialValues={{
                        orderNumber: '',
                        mobile: '',
                        date: []
                    }}
                    onFinish={this.search}
                    layout={"inline"}
                >
                    <Form.Item
                        name='orderNumber'
                        label='订单号'
                    >
                        <Input placeholder='输入订单号查询' allowClear/>
                    </Form.Item>
                    <Form.Item
                        name='mobile'
                        label='手机号'
                    >
                        <Input placeholder='输入手机号查询' allowClear/>
                    </Form.Item>
                    <Form.Item
                        label='日期'
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
                    dataSource={this.state.orderList}
                    scroll={{x: 1000}} sticky
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
                        title={'ID'}
                        dataIndex={'id'}
                    />
                    <Table.Column
                        title={'订单号'}
                        dataIndex={'orderNumber'}
                    />
                    <Table.Column
                        title={'订单人姓名'}
                        dataIndex={'user'}
                        render={(user: IUser) => {
                            return (<>{user.name}</>)
                        }}
                    />
                    <Table.Column
                        title={'订单人电话'}
                        dataIndex={'user'}
                        render={(user: IUser) => {
                            return (<>{user.mobile}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人姓名'}
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.name}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人电话'}
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.mobile}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人地址'}
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.address}</>)
                        }}
                    />
                    <Table.Column
                        title={'创建日期'}
                        dataIndex={'createdAt'}
                        render={(createdAt) =>
                            <>
                                {moment(createdAt).format('YYYY-MM-DD  HH:MM:SS')}
                            </>
                        }
                    />
                    <Table.Column
                        title={'原价'}
                        dataIndex={'originalPrice'}
                    />
                    <Table.Column
                        title={'成交价'}
                        dataIndex={'tradePrice'}
                    />
                    <Table.Column
                        width={220}
                        fixed={'right'}
                        title={'管理'}
                        render={(order: IOrder) => {
                            return (
                                <Space>
                                    <Button type='primary'>编辑</Button>
                                    <Button type='default'>详情</Button>
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

export default OrderList