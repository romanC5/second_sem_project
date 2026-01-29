import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProduct";
import Wrapper from "./Components/Wrapper";
import Cart_1 from "./Pages/Cart_1";
import Checkout from "./Pages/Checkout";
import Login_Signup from "./Pages/Login_Signup";
import Contact from "./Pages/Contact";
import Account_1 from "./Pages/Account_1";
import About from "./Pages/About";

// Admin imports
import { AdminLayout, Dashboard, Products, Orders, Customers, Settings } from "./admin";

// Super Admin imports
import { 
  SuperAdminLayout, 
  SuperAdminDashboard, 
  ShopsManagement, 
  Analytics, 
  SystemSettings 
} from "./superadmin";

function App() {
  return (
    <>
      <Routes>
        {/* Super Admin Routes */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="shops" element={<ShopsManagement />} />
          <Route path="shopkeepers" element={<ShopsManagement />} />
          <Route path="all-products" element={<Products />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<SystemSettings />} />
        </Route>

        {/* Admin Routes (Shopkeeper) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Wrapper><Home /></Wrapper>} />
        <Route path="/product/:id" element={<Wrapper><SingleProduct /></Wrapper>} />
        <Route path="/cart" element={<Wrapper><Cart_1 /></Wrapper>} />
        <Route path="/checkout" element={<Wrapper><Checkout /></Wrapper>} />
        <Route path="/login_Signup" element={<Wrapper><Login_Signup /></Wrapper>} />
        <Route path="/account" element={<Wrapper><Account_1 /></Wrapper>} />
        <Route path="/contact" element={<Wrapper><Contact /></Wrapper>} />
        <Route path="/about" element={<Wrapper><About /></Wrapper>} />
      </Routes>
    </>
  );
}

export default App;
