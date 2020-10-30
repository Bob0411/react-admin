import { AdminType } from './../types/AdminType';
import { AdminAction } from './../actions/AdminAction';
import { AdminState } from './../states/AdminState';
const initAdminState: AdminState = {
    id: 0,
    name: ''
}
const admin = (state: AdminState = initAdminState, action: AdminAction): AdminState => {
    switch (action.type) {
        case AdminType.GET:
            return { ...state }
        case AdminType.LOGIN:
            console.log(action.data)
            return { ...state }
        default:
            return state
    }
}
export default admin