import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from "antd";
import '../static/css/error.css'

class Page403 extends Component<any, any> {
    backHome = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className='error'>
                <Button type='primary' onClick={this.backHome}>
                    返回首页
                </Button>
            </div>
        )
    }
}

export default withRouter(Page403)