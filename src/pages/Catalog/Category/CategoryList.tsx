import React, {Component} from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

class CategoryList extends Component<any, any> {
    render() {
        return (
            <>
                <Button type='primary'><Link to='/admin/catalog/category/add'> 新增分类</Link></Button>
            </>
        );
    }
}

export default CategoryList