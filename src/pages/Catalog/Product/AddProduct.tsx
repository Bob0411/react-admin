import React, {Component} from "react";
import {Form, Input, Tabs, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from "antd/es/upload/interface";
import {UploadChangeParam} from "antd/lib/upload/interface";
import {get} from "../../../utils/storage";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const {TabPane} = Tabs;

interface IState {
    fileList: UploadFile[]
}

class AddProduct extends Component<any, IState> {
    state: IState = {
        fileList: []
    }
    change = (key: any) => {
        console.log(key)
    }
    handleChange = (info: UploadChangeParam) => {
        this.setState({
            fileList: info.fileList
        });
    }

    render() {
        return (
            <>
                <Form
                    {...layout}
                >
                    <Tabs defaultActiveKey="3" onChange={this.change}>
                        <TabPane tab="通用属性" key="1">

                            <Form.Item label='名称'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='描述'>
                                <TextArea/>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="数据" key="2">
                            <Form.Item label='产品型号'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='产品价格'>
                                <Input/>
                            </Form.Item>
                            <Form.Item label='产品数量'>
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
                </Form>
            </>
        );
    }
}

export default AddProduct