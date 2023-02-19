import { IProduct } from "../types/IProduct";
import { IOption } from "../UI/select/Select";
import { useMemo } from "react";

export const useSortedProduct = (products: IProduct[], sort: IOption) => {
    const sortedProducts = useMemo(() => {
        if (sort.value) {
            if (sort.value === "-") {
                return [...products]
            }
            if (sort.value === "id") {
                return [...products].reverse()
            }
            if (sort.value === "lprice") {
                return [...products].sort((first, second) => first.price - second.price)
            }
            if (sort.value === "hprice") {
                return [...products].sort((first, second) => second.price - first.price)
            }
        }
        return products
    }, [sort, products])

    return sortedProducts;
}

export const useProducts = (products: IProduct[], sort: IOption, query: string) => {
    const sortedProducts = useSortedProduct(products, sort)

    const sortedAndSearchedProducts = useMemo(() => {
        return sortedProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedProducts])

    return sortedAndSearchedProducts;
}
