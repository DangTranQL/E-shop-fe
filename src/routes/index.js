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
import ProductsPage from "../pages/ProductsPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import CartPage from "../pages/user/CartPage";
import PaymentPage from "../pages/user/PaymentPage";

function Router() {
  return (
    <Routes>
      <Route element={<BlankLayout/>}>
        {/* <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} /> */}
        <Route index element={<ProductsPage/>} />
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailPage />} />
      </Route>
      <Route path="/login" element={<BlankLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />}/>
      <Route element={<AuthRequire><MainLayout/></AuthRequire>}>
        <Route path="/user/profile" element={<UserProfilePage/>}/>
        <Route path="user/orders" element={<CartPage/>}/>
        <Route path="user/payment" element={<PaymentPage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;