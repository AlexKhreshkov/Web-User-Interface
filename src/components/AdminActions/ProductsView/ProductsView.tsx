import { ProductsViewThead } from "./ProductsViewThead"
import { ProductView } from "./ProductView"
import { ProductViewChanging } from "./ProductViewChanging"
import cl from "../AdminActions.module.css"
import { useAppDispatch } from "../../../hooks/useRedux"
import { useProductsState } from "../../../hooks/useStateHooks/useProductsState"
import { fetchProducts } from "../../../store/slices/productSlice"
import { Loader } from "../../../UI/loaders/Loader"
import { ViewTotal } from "../ViewTotal/ViewTotal"
import { useEffect, useState } from "react"

export const ProductsView = () => {

    const dispatch = useAppDispatch()
    const { products, isProductsLoading } = useProductsState()
    const [isChanging, setChanging] = useState(false)

    const toggleChanging = () => setChanging(!isChanging)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (isProductsLoading) {
        return <Loader />
    }

    return (
        <div>
            <ViewTotal count={products.length} name="Product" />
            <div className={cl.action__header}>
                <div>Products</div>
                <div className={cl.action__add}>Add</div>
            </div>
            <table className={cl.table}>
                <ProductsViewThead />
                {isChanging
                    ?
                    <tbody>
                        {products.map((product, index) =>
                            <ProductViewChanging
                                key={product.sku}
                                index={index}
                                product={product}
                                toggleChanging={toggleChanging}
                            />,
                        )}
                    </tbody>
                    :
                    <tbody>
                        {products.map((product, index) =>
                            <ProductView
                                key={product.sku}
                                index={index}
                                product={product}
                                toggleChanging={toggleChanging}
                            />,
                        )}
                    </tbody>
                }

            </table>
        </div>
    )
}
