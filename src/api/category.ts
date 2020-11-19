import request from '../utils/request'

export const getCategory = (page: number = 1, keyword: string = '') => {
    return request({
        url: '/admin/category/list',
        params: {page: page, keyword: keyword}
    })
}
export const deleteCategory = (categoryId: number) => {
    return request({
        url: '/admin/category/' + categoryId,
        method: 'delete'
    })
}
export const addCategory = (category: any) => {
    return request({
        url: '/admin/category',
        method: 'post',
        data: category
    })
}