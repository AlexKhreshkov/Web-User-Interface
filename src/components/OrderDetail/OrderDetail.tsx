import { OrderItem } from "./OrderItem/OrderItem"
import { useAppDispatch } from "../../hooks/useRedux"
import { fetchOrder, fetchProductsToOrder } from "../../store/slices/orderSlice"
import { IOrder, IOrderProduct } from "../../types/IOrder"
import { Loader } from "../../UI/loaders/Loader"
import { IProductFull } from "../../types/IProduct"
import { fetchProduct } from "../../store/slices/productSlice"
import cl from "../AdminActions/AdminActions.module.css"
import { useOrdersState } from "../../hooks/useStateHooks/useOrdersState"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const OrderDetail = () => {

    const { id } = useParams<{ id: string }>()

    const dispatch = useAppDispatch()
    const { ordersError } = useOrdersState()
    const orderId = Number(id)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [order, setOrder] = useState<IOrder>()
    const [order_product, setOrder_product] = useState<IOrderProduct[]>([])
    const [products, setProducts] = useState<IProductFull[]>([])
    const totalPrice = products.reduce((sum, cur) => sum + cur.price * cur.quantity, 0)

    async function fetchOrderHandler() {
        const orderResponse = await dispatch(fetchOrder(orderId))
        const order = orderResponse.payload
        if (order && typeof order !== "string") {
            setOrder(order)
            return order.id
        }
    }

    async function fetchProducts(orderProduct: IOrderProduct[]) {
        const products: IProductFull[] = []
        for (const item of orderProduct) {
            await dispatch(fetchProduct(item.product_sku))
                .then(productResponse => productResponse.payload)
                .then(product => {
                    if (product && typeof product !== "string") {
                        products.push({
                            ...item,
                            ...product,
                        })
                    }
                })
        }
        return products
    }

    useEffect(() => {
        fetchOrderHandler()
            .then(orderId => {
                if (orderId) {
                    return dispatch(fetchProductsToOrder(orderId))
                        .then(orderProductResponse => orderProductResponse.payload)
                        .then(orderProduct => {
                            if (orderProduct && typeof orderProduct !== "string") {
                                setOrder_product(orderProduct)
                                return orderProduct
                            }
                            throw new Error("Not found products to order")
                        })
                        .then(orderProduct => fetchProducts(orderProduct))
                        .then(products => setProducts(products))
                        .catch(err => setError(err))
                }
            }).finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, orderId])

    if (isLoading) {
        return <Loader />
    }
    if (ordersError) {
        return <div>Order not found</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div className={cl.action__header}>
                <div>Order № {id}</div>
            </div>
            <table className={cl.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>Product sku</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) =>
                        <OrderItem
                            key={product.sku}
                            index={index + 1}
                            product={product}
                        />,
                    )}
                </tbody>
            </table>
            <div>Total: {totalPrice}</div>
        </div>
    )
}
