import cl from "./UserInfoForm.module.css"
import { UserInfoFormLabel } from "./UserInfoFormLabel/UserInfoFormLabel"
import { MAX_EMAIL_LENGTH, MAX_LAST_NAME_LENGTH, MIN_EMAIL_LENGTH, MIN_FIRST_NAME_LENGTH, MIN_LAST_NAME_LENGTH } from "../../constants/lengthConstants"
import { IUseInput } from "../../hooks/useInput"
import { Input } from "../../UI/inputs/Input/Input"

interface OrderFormProps {
    firstName: IUseInput
    lastName: IUseInput
    email: IUseInput
}

export const UserInfoForm = (props: OrderFormProps) => {

    const { firstName, lastName, email } = props

    return (
        <form className={cl.form}>
            <UserInfoFormLabel text="First name" />
            <Input
                minLength={MIN_FIRST_NAME_LENGTH}
                maxLength={MAX_LAST_NAME_LENGTH}
                isFullWidth={true}
                value={firstName}
                fieldName="First name"
                required
            />
            <UserInfoFormLabel text="Last name" />
            <Input
                minLength={MIN_LAST_NAME_LENGTH}
                maxLength={MAX_LAST_NAME_LENGTH}
                isFullWidth={true}
                value={lastName}
                fieldName="Last name"
                required
            />
            <UserInfoFormLabel text="Email" />
            <Input
                minLength={MIN_EMAIL_LENGTH}
                maxLength={MAX_EMAIL_LENGTH}
                isFullWidth={true}
                value={email}
                fieldName="Email"
                htmlType={"email"}
                required
            />
        </form>
    )
}
