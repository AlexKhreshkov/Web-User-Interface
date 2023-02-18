import { IUserReponse } from "../types/IUser"

export const assertUsername = (user: IUserReponse): asserts user is IUserReponse & { username: string } => {
    if (!user.username) throw new Error("User dosen't have username")
} 