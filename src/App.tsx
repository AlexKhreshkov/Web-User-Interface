import { Loader } from "./UI/loaders/Loader";
import { Layout } from "./components/Layout/Layout";
import RequireAuth from "./middleware/RequireAuth";
import RequireCart from "./middleware/RequireCart";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy, Suspense } from "react"

const MainPage = lazy(() => import("./pages/Main/Main"))
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"))
const OrderPage = lazy(() => import("./pages/OrderPage/OrderPage"))
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"))
const AdminOrderDetailPage = lazy(() => import("./pages/AdminOrderDetail/AdminOrderDetail"))
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFound"))

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
                    <AdminOrderDetailPage />
                </Suspense>
            } />
        </Route>
        <Route path="*" element={
            <Suspense fallback={<Loader />}>
                <NotFoundPage />
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
