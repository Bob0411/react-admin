import React, {Component} from "react";
import {Button, Input, Row, Space, Table} from "antd";
import {Link} from "react-router-dom";
import {getCategory} from "../../../api/category";
import DeleteCategory from "./DeleteCategory";
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Tag from "antd/es/tag";
import Col from "antd/es/grid/col";

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

    getCategoryList = (page: number = 1, keyword: any = '') => {
        getCategory(page, keyword).then(response => {
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
    search = (keyword: any) => {
        this.getCategoryList(1, keyword)
    }

    render() {
        return (
            <>
                <Row gutter={8}>
                    <Col span={6}>
                        <Input.Search
                            addonBefore='搜索：'
                            placeholder='输入关键词查询'
                            allowClear
                            onSearch={this.search}
                            enterButton={<SearchOutlined/>}
                        />
                    </Col>
                    <Col span={6}>
                        <Link to='/admin/catalog/category/add'>
                            <Button type='primary' icon={<PlusOutlined/>}>
                                新增分类
                            </Button>
                        </Link>
                    </Col>
                </Row>


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
                                            <Tag color="success">启用</Tag>
                                            :
                                            <Tag color="warning">禁用</Tag>
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