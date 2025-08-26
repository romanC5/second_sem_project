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
function App() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart_1/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login_Signup" element={<Login_Signup />} />
          <Route path="/account" element={<Account_1 />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
