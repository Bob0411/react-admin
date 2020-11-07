export interface IAdmin {
    id: number
    avatar: string
    name: string
}

export interface AdminState {
    loading: boolean
    admin: IAdmin
}