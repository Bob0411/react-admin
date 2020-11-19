import React, {Component} from "react";
import {Button, Space, Table} from "antd";
import {Link} from "react-router-dom";
import {getProductCategory} from "../../../api/productCategory";
import DeleteCategory from "./DeleteCategory";

interface ICategory {
    id: number
    categoryName: string
    status: 0 | 1
}

interface ICategoryState {
    categoryList?: ICategory[]
    total: number
    perPage: number
    currentPage: number
}

class CategoryList extends Component<any, ICategoryState> {
    state: ICategoryState = {
        categoryList: [],
        total: 0,
        perPage: 15,
        currentPage: 1
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getCategoryList()
    }

    getCategoryList = (page: number = 1) => {
        getProductCategory(page).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                categoryList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage
            })
        })
    }
    deleteCategory = (categoryId: number) => {
        this.setState({
            categoryList: this.state.categoryList?.filter(category => category.id !== categoryId)
        })
    }
    onChange = (page: number = 1) => {
        this.getCategoryList(page)
    }

    render() {
        return (
            <>
                <Button type='primary'><Link to='/admin/catalog/category/add'> 新增分类</Link></Button>
                <Table
                    dataSource={this.state.categoryList}

                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        pageSize: this.state.perPage,
                        total: this.state.total,
                        current: this.state.currentPage,
                        onChange: this.onChange
                    }}
                    rowKey={'id'}
                >
                    <Table.Column
                        title='id'
                        dataIndex={'id'}
                    />
                    <Table.Column
                        title='分类名称'
                        dataIndex={'categoryName'}
                    />
                    <Table.Column
                        title='状态'
                        render={(category: ICategory) => {
                            return (
                                <>
                                    {
                                        category.status === 0 ?
                                            '不可用'
                                            :
                                            '可用'
                                    }
                                </>
                            )
                        }}
                    />
                    <Table.Column
                        title='操作'
                        render={(category: ICategory) => {
                            return (
                                <Space>
                                    <Button type='primary'>编辑</Button>
                                    <DeleteCategory categoryId={category.id} callback={this.deleteCategory}/>
                                </Space>
                            )
                        }}
                    />
                </Table>
            </>
        )
            ;
    }
}

export default CategoryList