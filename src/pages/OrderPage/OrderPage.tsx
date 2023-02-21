import cl from "./OrderPage.module.css"
import { UserInfoForm } from "../../components/UserInfoForm/UserInfoForm"
import { OrderTitle } from "../../components/OrderTitle/OrderTitle"
import { CartItems } from "../../components/Cart/CartItems/CartItems"
import { Container } from "../../components/Containers/Container"
import { CartTotal } from "../../components/Cart/CartTotal/CartTotal"
import { Button } from "../../UI/buttons/Button"
import { useInput } from "../../hooks/useInput"
import { MAX_EMAIL_LENGTH, MAX_LAST_NAME_LENGTH, MIN_EMAIL_LENGTH, MIN_FIRST_NAME_LENGTH, MIN_LAST_NAME_LENGTH } from "../../constants/lengthConstants"
import { useUser } from "../../hooks/useStateHooks/useUser"
import { useAppDispatch } from "../../hooks/useRedux"
import { updateUserInfo } from "../../store/slices/userSlice"
import { createOrder, createOrderProduct } from "../../store/slices/orderSlice"
import { IOrder, IOrderProduct } from "../../types/IOrder"
import { useCartState } from "../../hooks/useStateHooks/useCartState"
import { deleteFromCart } from "../../store/slices/cartSlice"
import { useNavigate } from "react-router-dom"

const OrderPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user } = useUser()
    const { cartProducts, cartRoot } = useCartState()

    const firstName = useInput(user?.first_name, {
        minLength: MIN_FIRST_NAME_LENGTH,
        maxLength: MAX_LAST_NAME_LENGTH,
    })
    const lastName = useInput(user?.last_name, {
        minLength: MIN_LAST_NAME_LENGTH,
        maxLength: MAX_LAST_NAME_LENGTH,
    })
    const email = useInput(user?.email, {
        minLength: MIN_EMAIL_LENGTH,
        maxLength: MAX_EMAIL_LENGTH,
    })

    const nolengthError = !(firstName.lengthError || lastName.lengthError || email.lengthError)
    const buttonState = firstName.isValid && lastName.isValid && email.isValid && nolengthError

    const makeOrderHanlder = () => {
        let userId = -1
        if (user?.id) {
            userId = user.id
        }
        Promise.all([
            dispatch(updateUserInfo({
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
            })),
            dispatch(createOrder({
                user_id: userId,
                status: "formed",
                created: String(new Date()),
            } as IOrder))
                .then(orderResponse => orderResponse.payload)
                .then(order => {
                    if (order && typeof order !== "string") {
                        for (const product of cartProducts) {
                            dispatch(createOrderProduct({
                                order_id: order.id,
                                product_sku: product.product_sku,
                                quantity: product.quantity,
                            } as IOrderProduct,
                            ))
                        }
                    }
                })
                .then(() => {
                    for (const product of cartProducts) {
                        dispatch(deleteFromCart(product.id))
                        cartRoot.cartProducts = []
                        cartRoot.cart_product = []
                    }
                })
            ,
        ]).then(() => {
            navigate("/")
        })
    }

    return (
        <Container>
            <div className={cl.order}>
                <OrderTitle />
                <UserInfoForm
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                />
                <CartItems />
                <CartTotal />
                <Button isDisabled={!buttonState} onClick={makeOrderHanlder}>SUBMIT ORDER</Button>
            </div>
        </Container>
    )
}

export default OrderPage