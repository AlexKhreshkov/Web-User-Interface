import { BASE_URL } from "../constants/baseUrl"
import { IRole } from "../types/IRole"
import { IUserReponse } from "../types/IUser"
import { USER_EXISTS, USER_NOT_FOUND } from "../constants/textContants"
import axios from "axios"

export const getRoleName = (id: number) => {
    return axios.get<IRole>(`${BASE_URL}/role/${id}`)
}

export const getUserResponse = async (username: string) => {
    const userResponse = (await axios.get<IUserReponse[]>(`${BASE_URL}/user`)).data
    if (userResponse) {
        const user = userResponse.find(user => user.username === username)
        if (!user) return `${USER_NOT_FOUND}`
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

export const checkUserInDb = async (username: string) => {
    const users = (await axios.get<IUserReponse[]>(`${BASE_URL}/user`)).data
    if (users) {
        return users.find(user => user.username === username)
    }
    return true
}

export const signUpUser = async (username: string, password: string) => {
    const isUserExists = await checkUserInDb(username)
    if (isUserExists) return `${USER_EXISTS}`
    await axios.post(`${BASE_URL}/user`, {
        username,
        password,
        role: 1, //Customer
        first_name: "",
        last_name: "",
        email: "",
    })
}

// export const fetchProductsToCart = async (cart_product: ICartProductResponse[]) => {
//     const products = (await axios.get<IProduct[]>(`${BASE_URL}/product`)).data
//     const productsToCart = []
//     for (let item of cart_product) {
//         const sku = item.product_sku
//         for (let product of products) {
//             if (product.sku === sku) {
//                 productsToCart.push(product)
//             }
//         }
//     }
//     return productsToCart
// }
