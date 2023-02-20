type Statuses = "formed" | "accpeted" | "declined"

export interface IOrder {
    id: number
    user_id: number
    created: string
    status: Statuses
}

export interface IOrderProduct {
    id: number
    order_id: number
    product_sku: string
    quantity: number
}