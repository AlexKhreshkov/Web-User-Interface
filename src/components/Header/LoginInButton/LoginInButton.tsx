import { LoginModal } from "../../../modules/LoginModal/LoginModal"
import { Button } from "../../../UI/buttons/Button"
import { SignUpModal } from "../../../modules/SignUpModal/SignUpModal"
import { useState } from "react"

export const LoginInButton = () => {

    const [isLoginModal, setLoginModal] = useState(false)
    const [isSignUpModal, setSignUpModal] = useState(false)
    const openLoginModal = () => setLoginModal(true)

    return (
        <>
            <LoginModal
                isLoginModal={isLoginModal}
                setLoginModal={setLoginModal}
                isSignUpModal={isSignUpModal}
                setSignUpModal={setSignUpModal}
            />
            <SignUpModal
                isLoginModal={isLoginModal}
                setLoginModal={setLoginModal}
                isSignUpModal={isSignUpModal}
                setSignUpModal={setSignUpModal}
            />
            <Button onClick={openLoginModal}>
                Sign In
            </Button>
        </>
    )
}
