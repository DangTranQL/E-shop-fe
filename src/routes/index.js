import * as React from "react";
import { Routes, Route} from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import PaymentPage from "../pages/user/PaymentPage";
import OrdersPage from "../pages/user/OrdersPage";
import OrderItemsPage from "../pages/user/OrderItemsPage";
import CartPage from "../pages/user/CartPage";
import AdminRequire from "./AdminRequire";
import AdminPage from "../pages/admin/AdminPage";
import UsersInfo from "../pages/admin/UsersInfo";
import OrdersInfo from "../pages/admin/OrdersInfo";
import ProductsPage from "../pages/admin/ProductsPage";
import CreateProduct from "../pages/admin/CreateProduct";

function Router() {
  return (
    <Routes>
      <Route element={<BlankLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<DetailPage />} />
      </Route>
      <Route path="/login" element={<BlankLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />}/>
      <Route element={<AuthRequire><MainLayout/></AuthRequire>}>
        <Route path="/user/profile" element={<UserProfilePage/>}/>
        <Route path="/user/cart" element={<CartPage/>}/>
        <Route path="/user/cart/:id" element={<OrderItemsPage/>}/>
        <Route path="/user/completedOrders" element={<OrdersPage/>}/>
        <Route path="/user/completedOrders/:id" element={<OrderItemsPage/>}/>
        <Route path="/payment/:id" element={<PaymentPage/>}/>

      </Route>
      <Route element={<AdminRequire><MainLayout/></AdminRequire>}>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/admin/accounts" element={<UsersInfo/>}/>
        <Route path="/admin/orders" element={<OrdersInfo/>}/>
        <Route path="/admin/products" element={<ProductsPage/>}/>
        <Route path="/admin/products/create" element={<CreateProduct/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;