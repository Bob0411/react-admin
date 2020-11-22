import React, {Component} from "react";
import {Button, Input, Row, Table} from "antd";
import {getOrderList} from "../../api/order";
import Col from "antd/es/grid/col";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

interface IOrder {
    id: number
    orderNumber: string
    originalPrice: number
    tradePrice: number
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
                        showSizeChanger:false
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
                        title={'原价'}
                        dataIndex={'originalPrice'}
                    />
                    <Table.Column
                        title={'成交价'}
                        dataIndex={'tradePrice'}
                    />
                </Table>

            </>
        )
    }
}

export default OrderList