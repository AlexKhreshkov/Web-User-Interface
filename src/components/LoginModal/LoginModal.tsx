import cl from "./LoginModal.module.css"
import { ModalGlobalError } from "../ModalGlobalError/ModalGlobalError"
import { ModalSubtitle } from "../ModalSubtitle/ModalSubtitle"
import { MAX_LOGIN_LENGTH, MAX_PASSWORD_LENGTH, MIN_LOGIN_LENGTH, MIN_PASSWORD_LENGTH } from "../../constants/lengthConstants"
import { useInput } from "../../hooks/useInput"
import { useAppDispatch } from "../../hooks/useRedux"
import { adminLogin, adminLogout, userLogin, userLogout } from "../../services/authService"
import { addUser } from "../../store/slices/userSlice"
import { Button } from "../../UI/buttons/Button"
import { Input } from "../../UI/inputs/Input/Input"
import { InputWithLable } from "../../UI/inputs/InputWithLabel/InputWithLabel"
import { Loader } from "../../UI/loaders/Loader"
import { BaseModal } from "../../UI/modals/BaseModal"
import { getUserResponse, getUserWithRoleName } from "../../api/api"
import { INVALID_PASSWORD, UNKNOWN_ERROR, USER_NOT_FOUND } from "../../constants/textContants"
import { useModalsState } from "../../hooks/useStateHooks/useModalsState"
import { useCallback, useState } from "react"

export const LoginModal = () => {

    const dispatch = useAppDispatch()
    const { isLoginModal, setLoginModallState, setSignUpModalState } = useModalsState()

    const username = useInput("", {
        minLength: MIN_LOGIN_LENGTH,
        maxLength: MAX_LOGIN_LENGTH,
    })
    const password = useInput("", {
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH,
    })

    const sumbitButtonState = username.isValid && password.isValid

    const openSignUpModal = useCallback(() => {
        setLoginModallState(false)
        setSignUpModalState(true)
    }, [setLoginModallState, setSignUpModalState])

    const [authError, setAuthError] = useState("")
    const [isLoading, setLoading] = useState(false)

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        async function checkUser() {
            const userResponse = await getUserResponse(username.value)
            if (userResponse && typeof userResponse !== "string") {
                if (userResponse.password === password.value) {
                    const userWithRoleName = (await getUserWithRoleName(userResponse))
                    if (userWithRoleName && typeof userWithRoleName !== "string") {
                        if (userWithRoleName.roleName === "Admin") {
                            userLogout()
                            adminLogin(userResponse.username)
                            dispatch(addUser(userWithRoleName))
                        }
                        if (userWithRoleName.roleName === "Customer") {
                            adminLogout()
                            userLogin(userResponse.username)
                            dispatch(addUser(userWithRoleName))
                        }
                        username.setValue("")
                        username.setDirty(false)
                        password.setValue("")
                        password.setDirty(false)
                        setLoginModallState(false)
                        setAuthError("")
                    } else {
                        setAuthError(`${UNKNOWN_ERROR}`)
                    }
                } else {
                    setAuthError(`${INVALID_PASSWORD}`)
                }
            } else {
                setAuthError(`${USER_NOT_FOUND} with this username`)
            }
        }
        checkUser()
        setLoading(false)
    }

    return (
        <BaseModal
            isVisible={isLoginModal}
            title="Sign In"
            setModalState={setLoginModallState}
        >
            {isLoading && <Loader />}
            <ModalSubtitle callback={openSignUpModal} title="Don't have an account?" linkText="Sign Up" />
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
                    Sign In
                </Button>
            </form>
        </BaseModal>
    )
}