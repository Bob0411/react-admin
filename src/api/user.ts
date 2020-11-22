import request from '../utils/request'

export const getUserList = (page: number = 1, search: any = {}) => {
    return request({
        url: 'admin/user/list',
        params: {
            page: page,
            ...search
        }
    })
}
export const deleteUser = (userId: number) => {
    return request({
        url: 'admin/user/' + userId,
        method: 'delete'
    })
}