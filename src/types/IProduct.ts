import { IOrderProduct } from "./IOrder"

export interface IProduct {
    //had to add because json server only has pk as id
    //sku is still fk
    id?: number
    sku: string,
    name: string
    description: string
    price: number
}


export interface IProductFull extends IOrderProduct {
    product_id?: number
    sku: string,
    name: string
    description: string
    price: number
}
