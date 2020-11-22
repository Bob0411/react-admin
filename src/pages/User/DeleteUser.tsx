import React, {Component} from "react";
import {Button, message, Popconfirm} from "antd";
import {deleteUser} from "../../api/user";

interface IProps {
    userId: number
    callback: (userId: number) => void
}

interface IState {
    visible: boolean
}

class DeleteUser extends Component<IProps, IState> {
    state: IState = {
        visible: false
    }
    showDeleteUser = () => {
        this.setState({visible: true})
    }
    deleteUser = () => {
        deleteUser(this.props.userId).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('删除成功')
                this.props.callback(this.props.userId)
            } else {
                message.error(msg)
            }
        })
        this.setState({visible: false})
    }
    cancelDeleteUser = () => {
        message.info('取消删除')
        this.setState({visible: false})
    }

    render() {
        return (
            <>
                <Popconfirm
                    visible={this.state.visible}
                    title='删除用户'
                    onConfirm={this.deleteUser}
                    onCancel={this.cancelDeleteUser}
                >
                    <Button type='primary' onClick={this.showDeleteUser} danger>删除</Button>
                </Popconfirm>
            </>
        )
    }
}

export default DeleteUser