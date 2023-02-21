import { Loader } from "./UI/loaders/Loader";
import { Layout } from "./components/Layout/Layout";
import RequireAuth from "./middleware/RequireAuth";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import RequireCart from "./middleware/RequireCart";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import NotFound from "./pages/NotFound/NotFound";
import { AdminOrderDetail } from "./pages/AdminOrderDetail/AdminOrderDetail";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy, Suspense } from "react"

const MainPage = lazy(() => import("./pages/Main/Main"))

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route index element={
            <Suspense fallback={<Loader />}>
                <MainPage />
            </Suspense>
        } />
        <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
            <Route path="profile" element={
                <Suspense fallback={<Loader />}>
                    <ProfilePage />
                </Suspense>
            } />
        </Route>
        <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
            <Route element={<RequireCart />}>
                <Route path="order" element={
                    <Suspense fallback={<Loader />}>
                        <OrderPage />
                    </Suspense>
                } />
            </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
            <Route path="profile" element={
                <Suspense fallback={<Loader />}>
                    <ProfilePage />
                </Suspense>
            } />
        </Route>
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="admin" element={
                <Suspense fallback={<Loader />}>
                    <AdminPage />
                </Suspense>
            } />
        </Route>
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="admin/order/:id" element={
                <Suspense fallback={<Loader />}>
                    <AdminOrderDetail />
                </Suspense>
            } />
        </Route>
        <Route path="*" element={
            <Suspense fallback={<Loader />}>
                <NotFound />
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
