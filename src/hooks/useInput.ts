import { useInputValidation, IValidations } from "./useInputValidation"
import { useState } from "react"

export interface IUseInput {
    isEmtpy: boolean;
    lengthError: boolean;
    value: string;
    onChange: (value: string | number) => void;
    onBlur: () => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setDirty: React.Dispatch<React.SetStateAction<boolean>>;
    isDirty: boolean;
    isValid: boolean,
    isInputEmpty: boolean
}

export const useInput = (initialValue?: string, validations?: IValidations) => {

    const [value, setValue] = useState<string>(initialValue ? initialValue : "")
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useInputValidation(value, validations)
    const isInputEmpty = (value.trim()).length === 0 ? true : false

    const onChange = (value: number | string): void => {
        const typedValue = String(value)
        setValue(typedValue)
    }

    const onBlur = () => {
        setDirty(true)
    }
    const isValid = !(valid.lengthError && isDirty)

    return {
        value, onChange, onBlur, setValue, setDirty, isDirty, isValid, isInputEmpty, ...valid,
    } as IUseInput
}