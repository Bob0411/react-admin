import request from '../utils/request'
export const getProductList=()=>{
    return request({
        url:'/admin/product/list'
    })
}