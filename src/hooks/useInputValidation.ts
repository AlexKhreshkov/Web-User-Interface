import { useEffect, useState } from "react"

export interface IValidations {
    isEmpty?: boolean,
    minLength?: number,
    maxLength?: number,
}

export const useInputValidation = (value: string, validations?: IValidations) => {
    const [isEmtpy, setEmpty] = useState<boolean>(true)
    const [lengthError, setLengthError] = useState<boolean>(false)

    useEffect(() => {
        if (validations) {
            if (validations.isEmpty) {
                value ? setEmpty(false) : setEmpty(true)
            }
            if (validations.minLength) {
                (value.trim()).length < validations.minLength ? setLengthError(true) : setLengthError(false)
            }
            if (validations.maxLength) {
                (value.trim()).length > validations.maxLength ? setLengthError(true) : setLengthError(false)
            }
            if (validations.minLength && validations.maxLength) {
                (value.trim()).length < validations.minLength || (value.trim()).length > validations.maxLength ? setLengthError(true) : setLengthError(false)
            }
        }
    }, [value, validations])

    return {
        isEmtpy,
        lengthError,
    }

}