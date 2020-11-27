import React, {Component} from "react";
import {Card, Col, Row, Table} from "antd";

class OrderDetail extends Component<any, any> {
    render() {
        return (
            <>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="订单信息" hoverable type='inner'>
                            <Row gutter={16}>
                                <Col span={6}>订单号：</Col>
                                <Col span={12}>2020-11-26</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>日期：</Col>
                                <Col span={12}>2020-11-26</Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>金额：</Col>
                                <Col span={12}>2000.00</Col>
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


                <Card title='订单详情'>
                    <Table
                        footer={() => {
                            return (
                                <>
                                    <Row>
                                        <Col>总额</Col>
                                        <Col>10000</Col>
                                    </Row>
                                </>
                            )
                        }}
                    >
                        <Table.Column
                            title='产品'
                        />
                        <Table.Column
                            title='型号'
                        />
                        <Table.Column
                            title='单价'
                        />
                        <Table.Column
                            title='数量'
                        />
                        <Table.Column
                            title='金额'
                        />
                    </Table>
                </Card>
            </>
        )
    }
}

export default OrderDetail