import request from '../utils/request'

export const getProductList = (page: number = 1) => {
    return request({
        url: '/admin/product/list',
        params: {page: page}
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