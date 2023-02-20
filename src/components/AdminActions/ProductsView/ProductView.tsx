import { IProduct } from "../../../types/IProduct"
import { Button } from "../../../UI/buttons/Button"

interface ProductViewProps {
    product: IProduct
    index: number
    toggleChanging: () => void
}

export const ProductView = ({ index, product, toggleChanging }: ProductViewProps) => {

    const { sku, name, price, description } = product

    const toggleChangingHandler = () => toggleChanging()

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {sku}
            </td>
            <td>{name}</td>
            <td>{price}$</td>
            <td>
                {description}
            </td>
            <td>
                <Button onClick={toggleChangingHandler} >
                    Change
                </Button>
            </td>
        </tr>
    )
}
