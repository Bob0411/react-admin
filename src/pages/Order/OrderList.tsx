import React, {Component} from "react";
import {Button, DatePicker, Form, Input, Select, Space, Table, Tag} from "antd";
import {getOrderList} from "../../api/order";
import moment from "moment";
import DeleteOrder from "./DeleteOrder";
import Permission from "../../components/Permission";
import {Link} from "react-router-dom";

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
    payStatus: number
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
    payStatusList = [
        {
            payStatus: 0,
            status: '取消',
            color: 'red'
        },
        {
            payStatus: 1,
            status: '新建',
            color: 'yellow'
        },
        {
            payStatus: 2,
            status: '支付中',
            color: 'gold'
        },
        {
            payStatus: 3,
            status: '已经支付',
            color: 'gold'
        },
        {
            payStatus: 4,
            status: '买家申请退货',
            color: 'red'
        },
        {
            payStatus: 5,
            status: '卖家确认退货申请',
            color: 'red'
        },
        {
            payStatus: 6,
            status: '卖家拒绝退货申请',
            color: 'red'
        },
        {
            payStatus: 7,
            status: '订单完结',
            color: 'blue'
        },
    ]

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
    deleteOrder = (orderNumber: string) => {
        this.setState({
            orderList: this.state.orderList?.filter((order: IOrder) => order.orderNumber !== orderNumber)
        })
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
                        name='pay_status'
                        label='订单状态'
                        valuePropName='value'
                    >
                        <Select placeholder='选择订单状态查询' allowClear>
                            {
                                this.payStatusList.map((payStatus, i) => (
                                    <Select.Option value={payStatus.payStatus}
                                                   key={i}>{payStatus.status}
                                    </Select.Option>
                                ))
                            }
                        </Select>
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
                    scroll={{x: 1500}}
                    sticky
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
                        fixed='left'
                        title={'ID'}
                        width={68}
                        dataIndex={'id'}
                    />
                    <Table.Column
                        fixed='left'
                        width={168}
                        title={'订单号'}
                        dataIndex={'orderNumber'}
                    />
                    <Table.Column
                        title={'状态'}
                        width={168}
                        render={(order: IOrder) => {
                            return (
                                <>
                                    {
                                        this.payStatusList.map((status, i) => {
                                            if (status.payStatus === order.payStatus) {
                                                return <Tag key={i} color={status.color}>{status.status}</Tag>
                                            }
                                        })
                                    }
                                </>
                            )
                        }}
                    />
                    <Table.Column
                        title={'订单人姓名'}
                        ellipsis
                        width={168}
                        dataIndex={'user'}
                        render={(user: IUser) => {
                            return (<>{user.name}</>)
                        }}
                    />
                    <Table.Column
                        title={'订单人电话'}
                        ellipsis
                        width={168}
                        dataIndex={'user'}
                        render={(user: IUser) => {
                            return (<>{user.mobile}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人姓名'}
                        width={168}
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.name}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人电话'}
                        width={168}
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.mobile}</>)
                        }}
                    />
                    <Table.Column
                        title={'收件人地址'}
                        width={168}
                        ellipsis
                        dataIndex={'address'}
                        render={(address: IAddress) => {
                            return (<>{address.address}</>)
                        }}
                    />
                    <Table.Column
                        title={'创建日期'}
                        width={188}
                        dataIndex={'createdAt'}
                        ellipsis
                        render={(createdAt) =>
                            <>
                                {moment(createdAt).format('YYYY-MM-DD  HH:MM:SS')}
                            </>
                        }
                    />
                    <Table.Column
                        title={'原价'}
                        width={168}
                        dataIndex={'originalPrice'}
                    />
                    <Table.Column
                        title={'成交价'}
                        width={168}
                        dataIndex={'tradePrice'}
                    />
                    <Table.Column
                        width={220}
                        fixed={'right'}
                        title={'管理'}
                        render={(order: IOrder) => {
                            return (
                                <Space>
                                    <Link to={`/admin/order/edit/${order.id}`}>
                                        <Button type='primary'>编辑</Button>
                                    </Link>
                                    <Link to={`/admin/order/detail/${order.id}`}>
                                        <Button type='default'>详情</Button>
                                    </Link>
                                    <Permission path='deleteOrder'>
                                        <DeleteOrder orderNumber={order.orderNumber} callback={this.deleteOrder}/>
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

export default OrderList