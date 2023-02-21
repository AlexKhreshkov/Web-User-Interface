import { Container } from "../../components/Containers/Container"
import { GoBackButton } from "../../components/GoBackBtn/GoBackBtn"
import { OrderDetail } from "../../components/OrderDetail/OrderDetail"
import cl from "../AdminPage/AdminPage.module.css"

export const AdminOrderDetail = () => {
    return (
        <Container>
            <div className={cl.adminPage}>
                <GoBackButton />
                <OrderDetail />
            </div>
        </Container>
    )
}
