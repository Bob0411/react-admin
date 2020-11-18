import React, {Component} from "react";
import {Button, message, Popconfirm} from "antd";
import {deleteCategory} from "../../../api/productCategory";

interface IState {
    visibleDelete: boolean
}

interface IProps {
    categoryId: number
}

class DeleteCategory extends Component<IProps, IState> {
    state: IState = {
        visibleDelete: false
    }
    deleteCategory = () => {
        this.setState({
            visibleDelete: true
        })
    }
    confirm = () => {
        deleteCategory(this.props.categoryId).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                this.setState({
                    visibleDelete: false
                })
                message.success('删除成功')
            } else {
                message.error(msg)
            }
        })
    }
    cancel = () => {
        this.setState({
            visibleDelete: false
        })
        message.info('你取消了删除！')
    }

    render() {
        return (
            <>
                <Popconfirm title='你确定要删除分类吗？删除后不可以恢复！'
                            visible={this.state.visibleDelete}
                            okText="删除"
                            placement="topRight"
                            onConfirm={this.confirm}
                            onCancel={this.cancel}
                            cancelText="取消"
                >
                    <Button type='primary' onClick={this.deleteCategory} danger>删除</Button>
                </Popconfirm>
            </>
        )
    }
}

export default DeleteCategory