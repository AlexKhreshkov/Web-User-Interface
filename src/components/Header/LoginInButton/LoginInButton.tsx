import { Button } from "../../../UI/buttons/Button"
import { useModalsState } from "../../../hooks/useStateHooks/useModalsState"

export const LoginInButton = () => {

    const { setLoginModallState } = useModalsState()
    const openLoginModal = () => setLoginModallState(true)

    return (
        <Button onClick={openLoginModal}>
            Sign In
        </Button>
    )
}
