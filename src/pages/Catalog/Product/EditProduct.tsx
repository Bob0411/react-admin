import React, {Component} from "react";
import {Button, Form, Input, message, Tabs, TreeSelect, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {PlusOutlined} from '@ant-design/icons';
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {get} from "../../../utils/storage";
import {getProductDetail, getProductOption, updateProduct} from "../../../api/product";
import {withRouter} from "react-router-dom";
import {getAllCategory} from "../../../api/category";
import {TreeNode} from "antd/es/tree-select";
import EditGoods from "./EditGoods";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
const {TabPane} = Tabs;


interface IProduct {
    productName: string
    description: string
    model: string
    price: number
    quantity: number
    imgList: string[]
    categoryIds: number[]
}

interface ICategory {
    categoryName: string
    description: string
    id: number
    status: number
    parentId: number
    children?: ICategory[]
}

// 0: {option_value_id: 3, quantity: 1, sub_stock: 1, add_price: 1}

interface IProductOption {
    option_value_id: number
    quantity: number
    sub_stock: number
    add_price: number
}

interface IState {
    fileList: UploadFile[]
    product?: IProduct
    categoryList: ICategory[]
    optionList: IProductOption[]
}

class EditProduct extends Component<any, IState> {
    state: IState = {
        fileList: [],
        categoryList: [],
        optionList: []
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getProductOption()
        this.getAllCategory()
        this.getProductDetail()
    }

    getProductDetail = () => {
        getProductDetail(this.props.match.params.productId).then(response => {
            const {data} = response.data
            let imgList: UploadFile[] = []
            data.imgList.forEach((img: any) => {
                imgList.push({
                    size: 1,
                    type: '',
                    uid: img.id,
                    name: 'image.png',
                    status: 'done',
                    url: img.imgUrl
                })
            })
            this.setState({
                product: data,
                fileList: imgList
            })
        })
    }
    getAllCategory = () => {
        getAllCategory().then(response => {
            const {data} = response.data
            this.setState({
                categoryList: data
            })
        })
    }
    handleChange = (info: UploadChangeParam) => {
        this.setState({
            fileList: info.fileList
        });
    }
    getProductOption = () => {
        getProductOption(this.props.match.params.productId).then(response => {
            const {data} = response.data
            let optionList: any[] = []
            data.forEach((p: any) => {
                let d: any[] = []
                p.forEach((option: any) => {
                    let tmp: IProductOption = {
                        option_value_id: option.optionValueId,
                        quantity: option.quantity,
                        sub_stock: option.subStock,
                        add_price: option.addPrice
                    }
                    d.push(tmp)
                })
                optionList.push(d)
            })
            console.log(optionList)
            this.setState({
                optionList: optionList
            })
        })
    }
    updateProduct = (product: any) => {
        let imgList: string[] = []
        this.state.fileList.forEach((file) => {
            if (file.response === undefined) {
                if (file.url) {
                    imgList.push(file.url);
                }
            } else {
                imgList.push(file.response.url)
            }
        })
        product.imgList = imgList


        let optionList: any[] = [];
        product.optionList?.forEach((v: any) => {
            v.forEach((v1: any) => {
                optionList.push(v1);
            })
        })
        product.optionList = optionList;

        updateProduct(this.props.match.params.productId, product).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('更新成功！')
                this.props.history.goBack()
            } else {
                message.error(msg)
            }
        })
    }


    render() {
        return (
            <>
                {
                    this.state.product ?
                        <Form
                            {...layout}
                            initialValues={{
                                ...this.state.product,
                                product_name: this.state.product?.productName,
                                categoryIds: this.state.product?.categoryIds,
                                optionList: this.state.optionList
                                // optionList: [
                                //     [
                                //         {
                                //             option_value_id: 18
                                //         },
                                //         {
                                //             option_value_id: 18
                                //         },
                                //     ],
                                //     [
                                //         {
                                //             option_value_id: 5
                                //         },
                                //         {
                                //             option_value_id: 5
                                //         },
                                //     ]
                                // ]
                            }}
                            onFinish={this.updateProduct}
                        >
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="通用属性" key="1">
                                    <Form.Item
                                        name='product_name'
                                        label='名称'
                                        rules={[{
                                            type: "string",
                                            message: '产品名称不可以为空',
                                            required: true
                                        }]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label='描述'
                                        name='description'
                                        rules={[
                                            {
                                                type: "string",
                                                required: true,
                                                message: '产品描述不可以为空'
                                            }
                                        ]}
                                    >
                                        <TextArea/>
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="数据" key="2">
                                    <Form.Item
                                        label='产品型号'
                                        name='model'
                                        rules={[
                                            {
                                                type: "string",
                                                required: true,
                                                message: '产品型号不可以为空'
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label='产品价格'
                                        name='price'
                                        rules={[
                                            {
                                                type: "number",
                                                required: true,
                                                validator: (rule, value) => {
                                                    if (value <= 0) {
                                                        return Promise.reject('产品价格必须大于0')
                                                    }
                                                    return Promise.resolve()
                                                }
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label='产品数量'
                                        name='quantity'
                                        rules={[
                                            {
                                                type: "number",
                                                required: true,
                                                min: 0,
                                                validator: (rule, value) => {
                                                    if (value < 0) {
                                                        return Promise.reject('产品数量不可以小于0');
                                                    }
                                                    return Promise.resolve()
                                                }
                                            }
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="图片" key="3">
                                    <Form.Item label=''>
                                        <Upload
                                            name={'file'}
                                            headers={{'Authorization': 'Bearer ' + get('token')}}
                                            onChange={this.handleChange}
                                            action={process.env.REACT_APP_BASE_API + '/admin/upload'}
                                            listType="picture-card"
                                            fileList={this.state.fileList}
                                        >
                                            {
                                                this.state.fileList.length >= 8 ?
                                                    null
                                                    :
                                                    <div>
                                                        <PlusOutlined/>
                                                        <div style={{marginTop: 8}}>Upload</div>
                                                    </div>
                                            }


                                        </Upload>

                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="相关信息" key="4">
                                    <Form.Item
                                        name={'categoryIds'}
                                        label='分类'
                                        valuePropName='value'
                                    >
                                        <TreeSelect
                                            multiple
                                            showSearch
                                            placeholder="选择分类"
                                            allowClear
                                            treeDefaultExpandAll
                                        >
                                            {
                                                this.state.categoryList.map((category: ICategory) => {
                                                    return <TreeNode
                                                        value={category.id}
                                                        title={category.categoryName}
                                                        key={category.id}
                                                    >
                                                        {
                                                            category.children?.map((cate: ICategory) => {
                                                                return (
                                                                    <TreeNode
                                                                        value={cate.id}
                                                                        title={cate.categoryName}
                                                                        key={cate.id}>
                                                                        {
                                                                            cate.children?.map((c: ICategory) => (
                                                                                <TreeNode
                                                                                    value={c.id}
                                                                                    title={c.categoryName}
                                                                                    key={c.id}>
                                                                                </TreeNode>
                                                                            ))
                                                                        }
                                                                    </TreeNode>
                                                                )
                                                            })
                                                        }
                                                    </TreeNode>
                                                })
                                            }
                                        </TreeSelect>
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab='编辑商品' key='5'>
                                    <EditGoods/>
                                </TabPane>
                            </Tabs>
                            <Form.Item {...tailLayout}>
                                <Button type='primary' htmlType="submit">更新</Button>
                            </Form.Item>
                        </Form>
                        :
                        null
                }

            </>
        );
    }
}

export default withRouter(EditProduct)