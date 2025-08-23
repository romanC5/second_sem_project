import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SingleProduct from "./Pages/SingleProduct";
import Wrapper from "./Components/Wrapper";
import Cart_1 from "./Pages/Cart_1";

function App() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart_1/>} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
