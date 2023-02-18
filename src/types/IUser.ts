import { Roles } from "./IRole"

export interface IUserReponse {
    id: number
    username: string
    password: string
    role: number
    first_name: string
    last_name: string
    email: string
}

export interface IUser {
    id: number
    username: string
    password: string
    role: number
    roleName: Roles
    first_name: string
    last_name: string
    email: string
}