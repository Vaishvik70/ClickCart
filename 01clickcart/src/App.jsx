import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import store from "./store/store";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import SaleProductDetail from "./pages/SaleProductDetail";
import OfferDetail from "./components/OfferDetail";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import History from "./pages/History";
import Hero from "./components/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import BestSelling from "./components/BestSelling";
import SellerRegister from "./seller/SellerRegister";
import SellerDashbord from "./seller/SellerDashbord";
import SellerLogin from "./seller/SellerLogin";
import SellerHome from "./seller/SellerHome";
import "./index.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-black", "text-white");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Provider store={store}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/sale-product/:id" element={<SaleProductDetail />} />
          <Route path="/offer/:id" element={<OfferDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-home" element={<SellerHome />} />
          <Route path="/seller-dashboard" element={<SellerDashbord />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
