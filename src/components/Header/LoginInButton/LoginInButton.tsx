import { LoginModal } from "../../../modules/LoginModal/LoginModal"
import { Button } from "../../../UI/buttons/Button"
import { useState } from "react"

export const LoginInButton = () => {

    const [isLoginModal, setLoginModal] = useState(false)
    const openLoginModal = () => setLoginModal(true)

    return (
        <>
            <LoginModal
                isLoginModal={isLoginModal}
                setLoginModal={setLoginModal}
            />
            <Button onClick={openLoginModal}>
                Sign In
            </Button>
        </>
    )
}
