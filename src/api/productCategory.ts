import request from '../utils/request'

export const getProductCategory = (page: number = 1) => {
    return request({
        url: '/admin/product/category/list',
        params: {page: page}
    })
}
export const deleteCategory = (categoryId: number) => {
    return request({
        url: '/admin/product/category/' + categoryId,
        method: 'delete'
    })
}