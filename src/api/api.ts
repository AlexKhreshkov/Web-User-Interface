import { BASE_URL } from "../constants/baseUrl"
import { IRole } from "../types/IRole"
import { IUserReponse } from "../types/IUser"
import axios from "axios"

export const getRoleName = (id: number) => {
    return axios.get<IRole>(`${BASE_URL}/role/${id}`)
}

export const getUserResponse = async (username: string) => {
    const userResponse = (await axios.get<IUserReponse[]>(`${BASE_URL}/user`)).data
    if (userResponse) {
        const user = userResponse.find(user => user.username === username)
        if (!user) return null
        return user
    }
}

export const getUserWithRoleName = async (userResponse: IUserReponse) => {
    const roleId = userResponse.role
    const roleName = (await getRoleName(roleId)).data.name
    if (roleId) {
        return {
            ...userResponse,
            roleName,
        }
    }
}