import React, {Component} from "react";
import {Card, Col, Row, Steps, Table} from "antd";
import {withRouter} from "react-router-dom";
import {getOrderDetail} from "../../api/order";
import {RouteComponentProps} from "react-router";
import moment from "moment";

const {Step} = Steps;

interface IProps extends RouteComponentProps {

}

interface IOrder {
    id: number
    orderNumber: string
    createdAt: string
    tradePrice: string
    payStatus: number
}

interface IProduct {
    id: number
    orderId: number
    productId: number
    name: string
    model: string
    quantity: number
    price: number
    total: number
}

interface IState {
    order?: IOrder
    productList?: IProduct[]
    totalMoney: number
}

class OrderDetail extends Component<IProps, IState> {
    state: IState = {
        totalMoney: 0
    }

    constructor(props: IProps, context: any) {
        super(props, context);
        this.getOrderDetail()
    }

    getOrderDetail() {
        // @ts-ignore
        let orderId = this.props.match.params.orderId
        getOrderDetail(orderId).then(response => {
            const {order, productList} = response.data.data
            let total = 0
            productList.forEach((product: any) => {
                total += product.total
            })
            this.setState({
                order: order,
                productList: productList,
                totalMoney: total
            })
        })
    }

    render() {
        return (
            <>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="订单信息" hoverable type='inner'>
                            <Row gutter={16}>
                                <Col span={6}>订单号：</Col>
                                <Col span={12}>{this.state.order?.orderNumber}</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>日期：</Col>
                                <Col span={12}>
                                    {moment(this.state.order?.createdAt).format('YYYY-MM-DD  HH:MM:SS')}
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>金额：</Col>
                                <Col span={12}>{this.state.order?.tradePrice}</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="用户信息" hoverable type='inner'>
                            <Row gutter={16}>
                                <Col span={6}>姓名：</Col>
                                <Col span={12}>hanyun</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>电话：</Col>
                                <Col span={12}>15701308875</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>余额：</Col>
                                <Col span={12}>2000.00</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="收件人信息" hoverable type='inner'>
                            <Row gutter={16}>
                                <Col span={6}>姓名：</Col>
                                <Col span={12}>hanyun</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>电话：</Col>
                                <Col span={12}>15701308875</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>地址：</Col>
                                <Col span={12}>XXXXXXXXXXXXXXXXXXXXX</Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                {
                    this.state.order ?
                        <Steps current={this.state.order?.payStatus}>
                            <Step title="新建订单" description="不吃辣椒，不要葱姜蒜"/>
                            <Step title="已经发货"/>
                            <Step title="签收"/>
                            <Step title="申请退货"/>
                            <Step title="卖家同意退货"/>
                            <Step title="买家退货中"/>
                            <Step title="卖家已经收获"/>
                            <Step title="结束"/>
                        </Steps>
                        :
                        null

                }
                <Card title='订单详情'>
                    <Table
                        pagination={false}
                        dataSource={this.state.productList}
                        rowKey='id'
                        footer={() => {
                            return (
                                <>
                                    {
                                        this.state.totalMoney > 0 ?
                                            <Row gutter={16} justify='end'>
                                                <Col>总额：</Col>
                                                <Col>{this.state.totalMoney}</Col>
                                            </Row>
                                            :
                                            null
                                    }
                                </>
                            )
                        }}
                    >
                        <Table.Column
                            dataIndex={'name'}
                            title='产品'
                        />
                        <Table.Column
                            dataIndex={'model'}
                            title='型号'
                        />
                        <Table.Column
                            dataIndex={'price'}
                            title='单价'
                        />
                        <Table.Column
                            dataIndex={'quantity'}
                            title='数量'
                        />
                        <Table.Column
                            dataIndex={'total'}
                            title='金额'
                        />
                    </Table>
                </Card>
            </>
        )
    }
}

export default withRouter(OrderDetail)