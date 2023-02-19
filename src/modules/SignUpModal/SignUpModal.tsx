import cl from "./SignUpModal.module.css"
import { ModalGlobalError } from "../../components/ModalGlobalError/ModalGlobalError"
import { ModalSubtitle } from "../../components/ModalSubtitle/ModalSubtitle"
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../../constants/lengthConstants"
import { useInput } from "../../hooks/useInput"
import { useAppDispatch } from "../../hooks/useRedux"
import { userLogin } from "../../services/authService"
import { addUser } from "../../store/slices/userSlice"
import { Button } from "../../UI/buttons/Button"
import { Input } from "../../UI/inputs/Input/Input"
import { InputWithLable } from "../../UI/inputs/InputWithLabel/InputWithLabel"
import { Loader } from "../../UI/loaders/Loader"
import { BaseModal } from "../../UI/modals/BaseModal"
import { getUserResponse, signUpUser } from "../../api/api"
import { USER_NOT_FOUND } from "../../constants/textContants"
import { useCallback, useState } from "react"

interface LoginModalProps {
    isSignUpModal: boolean
    isLoginModal: boolean
    setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
    setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const SignUpModal = (props: LoginModalProps) => {

    const dispatch = useAppDispatch()
    const { isSignUpModal, setLoginModal, setSignUpModal } = props

    const username = useInput("", {
        minLength: MIN_LOGIN_LENGTH,
        maxLength: MAX_LOGIN_LENGTH,
    })
    const password = useInput("", {
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH,
    })

    const sumbitButtonState = username.isValid && password.isValid

    const openLoginModal = useCallback(() => {
        setLoginModal(true)
        setSignUpModal(false)
    }, [setLoginModal, setSignUpModal])

    const [authError, setAuthError] = useState("")
    const [isLoading, setLoading] = useState(false)

    //REWRITTEN WITHOUT AsyncThunk 
    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        async function signUp() {
            const response = await signUpUser(username.value, password.value)
            if (typeof response === "string") {
                setAuthError(response)
                return
            }
            const userResponse = await getUserResponse(username.value)
            if (userResponse && typeof userResponse !== "string") {
                dispatch(addUser({
                    ...userResponse,
                    roleName: "Customer",
                }))
                userLogin(username.value)
                username.setValue("")
                username.setDirty(false)
                password.setValue("")
                password.setDirty(false)
                setSignUpModal(false)
                setAuthError("")
            } else {
                setAuthError(`${USER_NOT_FOUND}`)
            }
        }
        signUp()
        setLoading(false)
    }

    return (
        <BaseModal
            isVisible={isSignUpModal}
            title="Sign Up"
            setModalState={setSignUpModal}
        >
            {isLoading && <Loader />}
            <ModalSubtitle callback={openLoginModal} title="Have an account?" linkText="Sign In" />
            <ModalGlobalError errorText={authError} />
            <form className={cl.form} onSubmit={formHandler}>
                <InputWithLable label="Username">
                    <Input
                        value={username}
                        minLength={MIN_LOGIN_LENGTH}
                        maxLength={MAX_LOGIN_LENGTH}
                        fieldName="Username"
                        isFullWidth={true}
                        required
                    />
                </InputWithLable>
                <InputWithLable label="Password">
                    <Input
                        value={password}
                        minLength={MIN_PASSWORD_LENGTH}
                        maxLength={MAX_PASSWORD_LENGTH}
                        fieldName="Password"
                        htmlType={"password"}
                        isFullWidth={true}
                        required
                    />
                </InputWithLable>
                <Button
                    isDisabled={!sumbitButtonState}
                >
                    Sign Up
                </Button>
            </form>
        </BaseModal>
    )
}