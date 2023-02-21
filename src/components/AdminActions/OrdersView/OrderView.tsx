import { IOrder } from "../../../types/IOrder"
import { Button } from "../../../UI/buttons/Button"
import cl from "../AdminActions.module.css"
import { useNavigate } from "react-router-dom"

interface OrderViewProps {
    index: number
    order: IOrder
}

export const OrderView = ({ index, order }: OrderViewProps) => {

    const { created, id, status, user_id } = order
    const navigate = useNavigate()

    const showDetailsOfOrderHandler = () => navigate(`order/${id}`)

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{id}</td>
            <td>{user_id}</td>
            <td className={cl.created}>{created}</td>
            <td>{status}</td>
            <td>
                <Button onClick={showDetailsOfOrderHandler} >
                    View
                </Button>
            </td>
        </tr>
    )
}
