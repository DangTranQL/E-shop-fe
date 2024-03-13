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

function Router() {
  return (
    <Routes>
      <Route element={<BlankLayout/>}>
        {/* <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} /> */}
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
        <Route path="/user/orders" element={<OrdersPage/>}/>
        <Route path="/user/orders/:id" element={<OrderItemsPage/>}/>
        <Route path="/payment/:id" element={<PaymentPage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;