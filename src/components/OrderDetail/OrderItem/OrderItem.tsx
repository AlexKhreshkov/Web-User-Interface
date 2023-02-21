import { IProductFull } from "../../../types/IProduct"

interface OrderItemProps {
    index: number
    product: IProductFull
}

export const OrderItem = ({ index, product }: OrderItemProps) => {
    const { id, price, sku, quantity } = product
    return (
        <tr>
            <td>{index}</td>
            <td>{id}</td>
            <td>{sku}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{quantity * price}</td>
        </tr>
    )
}
