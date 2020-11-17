import React, {Component} from "react";
import {Button, Form, Input, message, Tabs, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from "antd/es/upload/interface";
import {UploadChangeParam} from "antd/lib/upload/interface";
import {get} from "../../../utils/storage";
import {getProductDetail, updateProduct} from "../../../api/product";
import {withRouter} from "react-router-dom";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
const {TabPane} = Tabs;

interface IImg {
    imgUrl: string
    id: number
}

interface IProduct {
    productName: string
    description: string
    model: string
    price: number
    quantity: number
    imgList: string[]
}

interface IState {
    fileList: UploadFile[]
    product?: IProduct
}

class EditProduct extends Component<any, IState> {
    state: IState = {
        fileList: []
    }
    handleChange = (info: UploadChangeParam) => {
        this.setState({
            fileList: info.fileList
        });
    }
    updateProduct = (product: IProduct) => {
        console.log(this.props.match.params.productId)
        let imgList: string[] = []
        if (this.state.fileList) {
            this.state.fileList.forEach((f) => {
                if (f.url !== undefined) {
                    imgList.push(f.url.toString())
                }
            })
        }
        product.imgList = imgList
        updateProduct(this.props.match.params.productId, product).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('更新成功！')
            } else {
                message.error(msg)
            }
        })
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        getProductDetail(1).then(response => {
            const {data} = response.data
            const fileList = data.imgList.map((img: IImg) => {
                return {
                    uid: img.id + '',
                    size: 1,
                    name: '',
                    url: img.imgUrl,
                    type: 'png'
                }
            })
            this.setState({
                product: data,
                fileList: fileList
            })
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
                                productName: this.state.product?.productName,
                            }}
                            onFinish={this.updateProduct}
                        >
                            <Tabs defaultActiveKey="3">
                                <TabPane tab="通用属性" key="1">
                                    <Form.Item
                                        name='productName'
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
                                <TabPane tab="属性" key="4">
                                    <Form.Item label='图片'>
                                        <Input/>
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="相关产品" key="5">
                                    <Form.Item label='图片'>
                                        <Input/>
                                    </Form.Item>
                                </TabPane>
                            </Tabs>
                            <Form.Item {...tailLayout}>
                                <Button type='primary' htmlType="submit">新增</Button>
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