import request from '../utils/request'

export const getOrderList = (page: number = 1, keyword: any = {}) => {
    return request({
        url: '/admin/order/list',
        params: {
            page: page,
            ...keyword
        }
    })
}
export const deleteOrder = (orderNumber: string) => {
    return request({
        url: '/admin/order/' + orderNumber,
        method: 'delete'
    })
}