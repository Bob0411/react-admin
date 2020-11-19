import request from '../utils/request'

export const getProductCategory = (page: number = 1, keyword: string = '') => {
    return request({
        url: '/admin/product/category/list',
        params: {page: page, keyword: keyword}
    })
}
export const deleteCategory = (categoryId: number) => {
    return request({
        url: '/admin/product/category/' + categoryId,
        method: 'delete'
    })
}
export const addCategory = (category: any) => {
    return request({
        url: '/admin/product/category',
        method: 'post',
        data: category
    })
}