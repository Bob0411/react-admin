import request from '../utils/request'
export const getRoleList = () => {
    return request({
        url: '/admin/role/list',
        method: 'GET'
    })
}
export const deleteRole = (roleId: number) => {
    return request({
        url: '/admin/role/' + roleId,
        method: 'delete'
    })
}

export const getRoleDetail = (roleId: number) => {
    return request({
        url: '/admin/role/' + roleId
    })
}
export const saveRole = (roleId: number, roleName: string, permissionList: number[]) => {
    return request({
        url: '/admin/role/' + roleId,
        method: 'post',
        data: {
            roleName: roleName,
            permissionList: permissionList
        }
    })
}
