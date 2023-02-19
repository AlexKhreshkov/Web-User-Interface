import cl from "./Main.module.css"
import { Container } from "../../components/Containers/Container"
import { Loader } from "../../UI/loaders/Loader"
import { useAppDispatch } from "../../hooks/useRedux"
import { fetchProducts } from "../../store/slices/productSlice"
import { Input } from "../../UI/inputs/Input/Input"
import { useInput } from "../../hooks/useInput"
import { FoundedNItems } from "../../components/FoundedNItems/FoundedNItems"
import { useDebounce } from "../../hooks/useDebounse"
import { IProduct } from "../../types/IProduct"
import { IOption, Select } from "../../UI/select/Select"
import { useProducts } from "../../hooks/useProducts"
import { useProductsState } from "../../hooks/useStateHooks/useProductsState"
import { ProductsList } from "../../modules/ProductsList/ProductsList"
import { useEffect, useMemo, useState } from "react"

const Main = () => {

    const dispatch = useAppDispatch()
    const { isProductsLoading } = useProductsState()
    const search = useInput()
    const [foundedProducts, setFoundedProducts] = useState<IProduct[]>([])

    const options = useMemo(() => [
        { value: "-", name: "-" },
        { value: "id", name: "id" },
        { value: "lprice", name: "Low to high" },
        { value: "hprice", name: "High to low" },
    ], [])
    const [option, setOption] = useState<IOption>(options[0])
    const debounsedValue = useDebounce(search.value)

    const sortedAndSearchedProducts = useProducts(foundedProducts, option, debounsedValue)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        search.setValue(e.target.value)
    }

    useEffect(() => {
        async function getData() {
            const productsResponse = (await dispatch(fetchProducts())).payload
            if (productsResponse && typeof productsResponse !== "string") {
                setFoundedProducts([...productsResponse])
            }
        }
        getData()
    }, [dispatch])

    if (isProductsLoading) {
        return <Loader />
    }

    return (
        <div className={cl.main}>
            <Container>
                <Input
                    value={search}
                    isFullWidth={true}
                    placeholder="Search..."
                    onChange={e => handleInput(e)}
                />
                <Select option={option} options={options} setOption={setOption} />
                <FoundedNItems name="product" count={sortedAndSearchedProducts.length} />
                <ProductsList products={sortedAndSearchedProducts} />
            </Container>
        </div>
    )
}
export default Main