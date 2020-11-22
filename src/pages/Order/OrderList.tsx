import React, {Component} from "react";
import {Button, DatePicker, Input, Row, Space, Table} from "antd";
import {getOrderList} from "../../api/order";
import Col from "antd/es/grid/col";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
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

    getOrderList = (page: number = 1, keyword: string = '') => {
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
    search = (keyword: any) => {
        this.setState({
            loading: true
        })
        this.getOrderList(1, keyword)
    }

    render() {
        return (
            <>
            <Row gutter={8}>
                <Col xs={12} sm={6} md={9} lg={8} xl={6}>
                    <Input.Search
                        addonBefore='搜索：'
                        placeholder='输入关键词查询'
                        allowClear
                        onSearch={this.search}
                        enterButton={<SearchOutlined/>}
                    />
                </Col>
                <Col xs={12} sm={6} md={9} lg={8} xl={6}>
                    <RangePicker/>
                </Col>
            </Row>
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