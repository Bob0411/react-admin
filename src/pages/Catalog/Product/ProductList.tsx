import React, {Component} from "react";
import {Button, Image, Input, Row, Space, Table} from "antd";
import {Link} from "react-router-dom";
import {getProductList} from "../../../api/product";
import DeleteProduct from "./DeleteProduct";
import Col from "antd/es/grid/col";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Tag from "antd/es/tag";

interface IProduct {
    id: number
    productName: string
    model: string
    price: number
    quantity: number
    status: number
    img: string
}

interface IProductListState {
    productList: IProduct[]
    total: number
    perPage: number
    currentPage: number
}

class ProductList extends Component<any, IProductListState> {
    state: IProductListState = {
        productList: [],
        total: 0,
        perPage: 15,
        currentPage: 1
    }


    constructor(props: Readonly<any> | any) {
        super(props);
        this.getProductList()
    }

    onChange = (page: number = 1) => {
        this.getProductList(page)
    }

    getProductList = (page: number = 1, keyword: any = '') => {
        getProductList(page, keyword).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                productList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage
            })
        })
    }
    deleteProduct = (productId: number) => {
        this.setState({
            productList: this.state.productList.filter((p) => p.id !== productId)
        })
    }
    search = (keyword: any) => {
        this.getProductList(1, keyword)
    }

    render() {
        return (
            <>
                <Row gutter={8}>
                    <Col xs={12} sm={6} md={8} lg={8} xl={4}>
                        <Input.Search
                            addonBefore='搜索：'
                            placeholder='输入关键词查询'
                            allowClear
                            onSearch={this.search}
                            enterButton={<SearchOutlined/>}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={8} lg={8} xl={4}>
                        <Link to='/admin/catalog/product/add'>
                            <Button type='primary' icon={<PlusOutlined/>}>
                                新增产品
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Table
                    rowKey='id'
                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        pageSize: this.state.perPage,
                        total: this.state.total,
                        current: this.state.currentPage,
                        onChange: this.onChange
                    }}
                    dataSource={this.state.productList}
                >
                    <Table.Column
                        title={'ID'}
                        dataIndex={'id'}
                    />
                    <Table.Column
                        title={'产品名称'}
                        dataIndex={'productName'}
                    />
                    <Table.Column
                        title={'图片'}
                        dataIndex={'img'}
                        render={(img: string) => {
                            return (
                                <Image
                                    width={100}
                                    src={img}
                                />
                            )
                        }}
                    />
                    <Table.Column
                        title={'型号'}
                        dataIndex={'model'}
                    />
                    <Table.Column
                        title={'价格'}
                        dataIndex={'price'}
                    />
                    <Table.Column
                        title={'数量'}
                        dataIndex={'quantity'}
                    />
                    <Table.Column
                        title={'状态'}
                        render={(product: IProduct) => {
                            return (
                                <>
                                    {
                                        product.status === 1 ?
                                            <Tag color="success">启用</Tag>
                                            :
                                            <Tag color="warning">禁用</Tag>
                                    }
                                </>
                            )
                        }}
                    />
                    <Table.Column
                        title={'状态'}
                        render={(product: IProduct) => {
                            return (
                                <>
                                    <Space>
                                        <Button type='primary'>
                                            <Link to={'/admin/catalog/product/edit/' + product.id}>
                                                编辑
                                            </Link>
                                        </Button>
                                        <DeleteProduct productId={product.id} callback={this.deleteProduct}/>
                                    </Space>
                                </>
                            )
                        }}
                    />
                </Table>
            </>
        );
    }
}

export default ProductList