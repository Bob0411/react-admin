import request from '../utils/request'
export const getRoleList = () => {
    return request({
        url: '/admin/role/list',
        method: 'GET'
    })
}