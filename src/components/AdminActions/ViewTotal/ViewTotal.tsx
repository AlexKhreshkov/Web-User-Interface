import cl from "../AdminActions.module.css"
import { memo } from "react"

interface ViewTotalProps {
    count: number
    name: string
}

export const ViewTotal = memo(({ count, name: propName }: ViewTotalProps) => {

    let name = ""
    if (count === 1) {
        name = propName
    } else if (count > 1) {
        name = propName + "s"
    }

    return (
        <div className={cl.action__total}>Total: {count} {name}</div>
    )
})