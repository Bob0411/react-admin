import React, {Component} from "react";
import {Button, message, Popconfirm} from "antd";
import {deleteOrder} from "../../api/order";

interface IProps {
    orderNumber: string
    callback: (orderNumber: string) => void
}

interface IState {
    visible: boolean
}

class DeleteOrder extends Component<IProps, IState> {
    state: IState = {
        visible: false
    }
    showConfirm = () => {
        this.setState({
            visible: true
        })
    }
    deleteOrder = () => {
        deleteOrder(this.props.orderNumber).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('删除成功')
                this.props.callback(this.props.orderNumber)
            } else {
                message.error(msg)
            }
        })
        this.setState({
            visible: false
        })
    }
    cancelDeleteOrder = () => {
        message.info('你取消了删除！');
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <>
                <Popconfirm
                    title='删除订单'
                    visible={this.state.visible}
                    onConfirm={this.deleteOrder}
                    onCancel={this.cancelDeleteOrder}
                >
                    <Button type='primary' onClick={this.showConfirm} danger>删除</Button>
                </Popconfirm>
            </>
        )
    }
}

export default DeleteOrder