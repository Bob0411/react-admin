import React, {Component} from "react";
import {Button, Image, Space, Table} from "antd";
import {Link} from "react-router-dom";
import {getProductList} from "../../../api/product";
import DeleteProduct from "./DeleteProduct";

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

    componentDidMount() {
        this.onChange()
    }

    onChange = (page: number = 1) => {
        getProductList(page).then(response => {
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

    render() {
        return (
            <>
                <Button type='primary'><Link to='/admin/catalog/product/add'> 新增产品</Link></Button>
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
                        dataIndex={'status'}
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