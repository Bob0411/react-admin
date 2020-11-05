import {AdminType} from '../types/AdminType';
import {AdminAction} from '../actions/AdminAction';
import {AdminState} from '../states/AdminState';

const initAdminState: AdminState = {
    loading: true,
    id: 0,
    name: ''
}
const admin = (state: AdminState = initAdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case AdminType.LOADING:
            return {...state, ...action.data}
        case AdminType.GET:
            return {...state}
        case AdminType.SET:
            return {...state, ...action.data}
        case AdminType.LOGIN:
            return {...state}
        default:
            return state
    }
}
export default admin