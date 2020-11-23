import request from '../utils/request'

export const getOptionList = () => {
    return request({
        url: '/admin/option/list'
    })
}
export const getOptionDetail = (optionId: number) => {
    return request({
        url: '/admin/option/' + optionId
    })
}