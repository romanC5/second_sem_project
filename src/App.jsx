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
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart_1 />} />
          
          {/* Protected checkout route */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/login_Signup" element={<Login_Signup />} />
          
          {/* You can also protect account page if needed */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account_1 />
              </ProtectedRoute>
            }
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
