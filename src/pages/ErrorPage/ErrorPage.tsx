import cl from "./ErrorPage.module.css"
import { Container } from "../../components/Containers/Container"

const Error = () => {
    return (
        <div className={cl.errorPage}>
            <Container>
                <div className={cl.title}>
                    Page not found
                </div>
            </Container>
        </div>
    )
}
export default Error