import { Button } from "../../UI/buttons/Button"
import { memo } from "react"
import { IoArrowUndoOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom"

export const GoBackButton = memo(() => {

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || -1

    const goBack = () => navigate(fromPage)

    return (
        <Button onClick={goBack}>
            <IoArrowUndoOutline />
            Back
        </Button>
    )
})