
import cl from "./AdminPage.module.css"
import { AdminActions } from "../../components/AdminActions/AdminActions"
import { Container } from "../../components/Containers/Container"
import { ProfileTitle } from "../../components/ProfileTitle/ProfileTitle"
import { SiteAdministration } from "../../components/SiteAdministration/SiteAdministration"

export const AdminPage = () => {
    return (
        <Container>
            <div className={cl.adminPage}>
                <ProfileTitle />
                <SiteAdministration />
                <AdminActions />
            </div>
        </Container>
    )
}
