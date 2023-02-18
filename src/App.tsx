import { lazy, Suspense } from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Loader } from "./UI/Loaders/Loader";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Layout } from "./components/Layout/Layout";

const MainPage = lazy(() => import("./pages/Main/Main"))

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={
            <Suspense fallback={<Loader />}>
                <MainPage />
            </Suspense>
        } />
        <Route path="*" element={
            <Suspense fallback={<Loader />}>
                <ErrorPage />
            </Suspense>
        } />
    </Route>,
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
