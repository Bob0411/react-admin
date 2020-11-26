import request from '../utils/request'

export const getProductList = (page: number = 1, keyword: any = '') => {
    return request({
        url: '/admin/product/list',
        params: {page: page, keyword: keyword}
    })
}
export const deleteProduct = (productId: number) => {
    return request({
        url: '/admin/product/' + productId,
        method: 'delete'
    })
}
export const addProduct = (data: any) => {
    return request({
        url: '/admin/product',
        data: data,
        method: 'post'
    })
}
export const getProductDetail = (productId: number) => {
    return request({
        url: '/admin/product/' + productId,
    })
}
export const updateProduct = (productId: number, product: any) => {
    return request({
        url: '/admin/product/' + productId,
        method: 'put',
        data: product
    })
}
export const getProductOption=(productId:number)=>{
    return request({
        url:'/admin/product/option/'+productId
    })
}