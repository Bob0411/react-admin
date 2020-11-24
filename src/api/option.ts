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
export const getOptionTypeList=()=>{
    return request({
        url:'/admin/option/type/list'
    })
}