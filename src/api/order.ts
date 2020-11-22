import request from '../utils/request'

export const getOrderList = (page: number = 1, keyword: string = '') => {
    return request({
        url: '/admin/order/list',
        params: {
            page: page,
            keyword: keyword
        }
    })
}