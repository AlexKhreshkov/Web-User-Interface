import { IOrder } from "../../../types/IOrder"
import cl from "../AdminActions.module.css"

interface OrderViewProps {
    index: number
    order: IOrder
}

export const OrderView = ({ index, order }: OrderViewProps) => {
    const { created, id, status, user_id } = order
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{id}</td>
            <td>{user_id}</td>
            <td className={cl.created}>{created}</td>
            <td>{status}</td>
        </tr>
    )
}
