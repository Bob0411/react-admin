import React, {Component} from "react";
import {Button, message, Popconfirm} from "antd";
import {deleteProduct} from "../../../api/product";

interface IProps {
    productId: number
    callback: (productId: number) => void
}

class DeleteProduct extends Component<IProps, any> {
    cancel = () => {
        message.info('取消删除')
    }
    delete = () => {
        deleteProduct(this.props.productId).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('删除成功！')
                this.props.callback(this.props.productId)
            } else {
                message.error(msg)
            }
        })
    }

    render() {
        return (
            <>
                <Popconfirm
                    title='你确定要删除么？删除后不可以恢复！'
                    okText='确认'
                    cancelText='取消'
                    onConfirm={this.delete}
                    onCancel={this.cancel}
                >
                    <Button type='primary' danger>删除</Button>
                </Popconfirm>
            </>
        )
    }
}

export default DeleteProduct