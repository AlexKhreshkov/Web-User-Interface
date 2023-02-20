import { useInput } from "../../../hooks/useInput"
import { IProduct } from "../../../types/IProduct"
import { Button } from "../../../UI/buttons/Button"
import { Input } from "../../../UI/inputs/Input/Input"
import { NumberInput } from "../../../UI/inputs/NumberInput/NumberInput"
import cl from "../AdminActions.module.css"
import { useAppDispatch } from "../../../hooks/useRedux"
import { changeProfuctInfo } from "../../../store/slices/productSlice"
import { useState } from "react"

interface ProductViewProps {
    product: IProduct
    index: number
    toggleChanging: () => void
}

export const ProductViewChanging = ({ index, product, toggleChanging }: ProductViewProps) => {

    const { id, sku, name, price, description } = product
    const dispatch = useAppDispatch()
    const nameInput = useInput(name)
    const descriptionInput = useInput(description)
    const [priceInput, setPriceInput] = useState(price)

    const toggleChangingHandler = () => toggleChanging()
    const changeProducthanlder = () => {
        toggleChanging()
        dispatch(changeProfuctInfo({
            price: price,
            description: descriptionInput.value,
            name: nameInput.value,
            sku,
            id,
        } as IProduct))
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {sku}
            </td>
            <td>
                <Input
                    value={nameInput}
                    isValidtion={false}
                />
            </td>
            <td>
                <NumberInput
                    value={priceInput}
                    setValue={setPriceInput}
                />
            </td>
            <td>
                <Input
                    value={descriptionInput}
                    isValidtion={false}
                />
            </td>
            <td className={cl.buttonsCol}>
                <Button onClick={changeProducthanlder}>
                    Save
                </Button>
                <Button onClick={toggleChangingHandler}>
                    Cansel
                </Button>
            </td>

        </tr>
    )
}
