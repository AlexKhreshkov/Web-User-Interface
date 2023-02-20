import cl from "../Input/Input.module.css"
import React from "react"

interface NumberInputProps {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export const NumberInput = ({ value, setValue }: NumberInputProps) => {

    return (
        <input
            className={cl.input}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            type="number"
        />
    )
}
