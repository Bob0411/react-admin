import React, {Component} from 'react'
import {Button} from 'antd'
import Permission from '../components/Permission'

class Index extends Component<any, any> {
    render() {
        return (
            <div>
                <Permission path='/a' children={<Button type='primary'>1111111111111</Button>}/>
                index
            </div>
        )
    }
}

export default Index