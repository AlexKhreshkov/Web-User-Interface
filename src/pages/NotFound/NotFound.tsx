import cl from "./NotFound.module.css"
import { Container } from "../../components/Containers/Container"

const NotFound = () => {
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
export default NotFound