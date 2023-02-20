import { Button } from "../../UI/buttons/Button"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

export const GoToAdminPageBtn = memo(() => {

    const navigate = useNavigate()
    const goToAdminPage = () => navigate("/admin")

    return (
        <Button onClick={goToAdminPage}>Admin page</Button>
    )
})