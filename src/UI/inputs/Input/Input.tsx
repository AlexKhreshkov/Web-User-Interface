import cl from "./Input.module.css"
import { PasswordToggle } from "./PasswordToggle"
import { IUseInput } from "../../../hooks/useInput"
import { HTMLInputTypeAttribute, useState } from "react"

interface IInputProps {
    value: IUseInput
    isFullWidth?: boolean
    required?: boolean
    placeholder?: string
    fieldName?: string
    htmlType?: HTMLInputTypeAttribute
    isValidtion?: boolean,
    minLength?: number,
    maxLength?: number,
    error?: any
    setErrorFieldEmpty?: () => void
}

export const Input = (props: IInputProps) => {
    const {
        value,
        required = false,
        isFullWidth,
        placeholder,
        fieldName = "Input",
        htmlType = "text",
        minLength,
        maxLength,
        isValidtion = true,
        error,
    } = props

    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [type, setType] = useState(htmlType === "password" ? "password" : htmlType)
    const isError = error || !value.isValid

    let rootClasses = [cl.input]
    if (isFullWidth) rootClasses.push(cl.fullWidth)

    let inputErrorText = ""

    if (!value.isValid) {
        inputErrorText = `${fieldName} must contains ${minLength} - ${maxLength} symbols`
    }
    if (error) {
        //Request error text (error under input)
        inputErrorText = error
    }

    if (isError) {
        rootClasses = rootClasses.filter(className => className !== cl.input)
        rootClasses.push(cl.invalidInput)
    }

    return (
        <div className={cl.input__container}>
            {error &&
                <div className={cl.errorText}>{error ? error : ""}</div>
            }
            {isValidtion && <div className={cl.errorText}>{inputErrorText}</div>}
            {htmlType === "password"
                ?
                <PasswordToggle
                    isPasswordVisible={isPasswordVisible}
                    setPasswordVisible={setPasswordVisible}
                    isError={isError}
                    type={type}
                    setType={setType}
                />
                :
                <></>
            }
            <input
                type={type}
                value={value.value}
                onChange={e => value.onChange(e.target.value)}
                onBlur={() => value.setDirty(true)}
                placeholder={placeholder}
                className={rootClasses.join(" ")}
                required={required}
            />
        </div>
    )
}
