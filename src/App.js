import { Route, Routes } from 'react-router-dom';
import AuthContentProvider from './contexts/AuthContext';
import Login from './pages/account/Login';
import Register from './pages/account/Register';
import AccountLayout from './layouts/AccountLayout';
import AdminLayout from './layouts/AdminLayout';
import Product from './pages/admin/Product';
import ProtectedRoutes from './components/ProtectedRoutes';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/customer/Home';
import Men from './pages/customer/Men';
import ViewAll from './components/contents/ViewAlll';
import Detail from './pages/customer/Detail';
import Women from './pages/customer/Women';
import NotFound from './pages/customer/NotFound';
import Cart from './pages/customer/Cart';
import Search from './pages/customer/Search';
import Invoice from './pages/admin/Invoice';
import Customer from './pages/admin/Customer';
import MyAccount from './pages/customer/MyAccount';
import MyDetail from './components/contents/MyDetail';
import Account from './components/contents/Account';
import AccountManager from './pages/admin/AccountManager';
import MyOrder from './pages/customer/MyOrder';

function App() {
    return (
        <AuthContentProvider>
            <Routes>
                <Route path="/" element={<CustomerLayout />}>
                    <Route index element={<Home />} />

                    <Route path="men" element={<Men />} />
                    <Route path="women" element={<Women />} />
                    <Route path="products" element={<ViewAll />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path="search/:q" element={<Search />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<ProtectedRoutes allowedRoles={[1, 2]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="product" element={<Product />} />
                        <Route path="order" element={<Invoice />} />
                        <Route path="customer" element={<Customer />} />
                    </Route>
                </Route>
                <Route path="/account" element={<AccountLayout />}>
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/my-account" element={<ProtectedRoutes allowedRoles={[0, 1, 2]} />}>
                    <Route element={<MyAccount />}>
                        <Route index element={<MyDetail />} />
                        <Route path="my-detail" element={<MyDetail />} />
                        <Route path="account" element={<Account />} />
                        <Route path="my-order" element={<MyOrder />} />
                    </Route>
                </Route>
                <Route path="/manager" element={<ProtectedRoutes allowedRoles={[2]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="account" element={<AccountManager />} />
                    </Route>
                </Route>
            </Routes>
        </AuthContentProvider>
    );
}
export default App;
