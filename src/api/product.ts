import request from '../utils/request'

export const getProductList = (page: number = 1) => {
    return request({
        url: '/admin/product/list',
        params: {page: page}
    })
}