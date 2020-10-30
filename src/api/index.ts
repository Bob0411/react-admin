import request from '../utils/request'
export const login = (data: any) => {
    return request({
        url: '/admin/login',
        method: 'POST',
        data: data
    })
}