export interface ICart {
    id: number
    user_id: number
    total_cost: number
}

export interface ICartProduct {
    id: number,
    cart_id: number,
    product_sku: string
    quantity: number
}
export interface ICartProductFull extends ICartProduct {
    name: string
    description: string
    price: number
}