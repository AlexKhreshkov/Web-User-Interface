import cl from "./Input.module.css"
import React from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

interface PasswordToggleProps {
    isError: boolean
    isPasswordVisible: boolean
    setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>
    type: string | (string & {})
    setType: React.Dispatch<React.SetStateAction<string | (string & {})>>
}

export const PasswordToggle = (props: PasswordToggleProps) => {

    const { isError, isPasswordVisible, setPasswordVisible, type, setType } = props

    const color = isError ? "red" : ""

    const togglePassword = () => {
        setPasswordVisible(!isPasswordVisible)
        if (type === "password") {
            setType("text")
        }
        if (type === "text") {
            setType("password")
        }
    }

    if (isPasswordVisible) {
        return (
            <IoEyeOutline
                color={color}
                className={cl.passwordToggle}
                onClick={togglePassword}
            />
        )
    }

    return (
        <IoEyeOffOutline
            color={color}
            className={cl.passwordToggle}
            onClick={togglePassword}
        />
    )
}
