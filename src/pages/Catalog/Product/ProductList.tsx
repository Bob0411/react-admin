import React, {Component} from "react";
import {Button, Image, Table} from "antd";
import {Link} from "react-router-dom";
import {getProductList} from "../../../api/product";

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
}

class ProductList extends Component<any, IProductListState> {
    state: IProductListState = {
        productList: []
    }

    componentDidMount() {
        getProductList().then(response => {
            const {lastPage, data} = response.data.data
            this.setState({
                productList: data
            })
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
                        hideOnSinglePage: true
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
                </Table>
            </>
        );
    }
}

export default ProductList