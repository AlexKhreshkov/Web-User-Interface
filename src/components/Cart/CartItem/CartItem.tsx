import { useAppDispatch } from "../../../hooks/useRedux"
import { calculateCartTotal, patchProductQuantity, changeProductQuantity, fetchCartProducts, fetchProductsToCart, deleteFromCart } from "../../../store/slices/cartSlice"
import { Button } from "../../../UI/buttons/Button"
import { Select } from "../../../UI/select/Select"
import cl from "../Cart.module.css"
import { useEffect, useMemo, useState } from "react"

interface CartItemProps {
    cart_itemId: number,
    index: number
    name: string
    price: number
    quantity: number
}

export const CartItem = (props: CartItemProps) => {

    const dispatch = useAppDispatch()
    const { cart_itemId, index, name, price, quantity } = props

    const options = useMemo(() => [
        { value: "1", name: "1" },
        { value: "2", name: "2" },
        { value: "3", name: "3" },
        { value: "4", name: "4" },
        { value: "5", name: "5" },
    ], [])

    const [option, setOption] = useState(options.find(option => option.value === `${quantity}`)!)

    const removeFromCartHandler = () => {
        async function removefromCart() {
            await dispatch(deleteFromCart(cart_itemId))
            await dispatch(fetchCartProducts())
            await dispatch(fetchProductsToCart())
        }
        removefromCart()
    }

    const changeProductQuantityHandler = () => {
        const data = {
            cart_itemId: Number(cart_itemId),
            quantity: Number(option.value),
        }
        dispatch(patchProductQuantity(data))
            .then(() => {
                dispatch(changeProductQuantity(data))
                dispatch(calculateCartTotal())
            })
    }

    useEffect(() => {
        changeProductQuantityHandler()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [option])

    return (
        <>
            <div className={cl.cart__item}>
                <div className={cl.item__name}>
                    {index}.{name}
                </div>
                <div>
                    <Select option={option} options={options} setOption={setOption} />
                </div>
                <div>{price}$</div>
                <div>Price: {price * Number(option.value)}$</div>
                <div onClick={removeFromCartHandler}>
                    <Button>Remove</Button>
                </div>
            </div>
            <div className={cl.blackLine}></div>
        </>
    )
}
