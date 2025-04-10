import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ProtectedUserRoute from "./hooks/ProtectedUserRoute";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import ForgotPassword from "./pages/ForgotPassword";
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
import SellerPage from "./pages/SellerPage";
import FeesAndCommission from "./seller/Fees & Commission";
import SellerRegister from "./seller/SellerRegister";
import SellerLogin from "./seller/SellerLogin";
import AddProduct from "./seller/AddProduct";
import SellerHelpPage from "./seller/SellerHelp";
import SellerDashboard from "./seller/SellerDashboard";
import SellerOrders from "./seller/SellerOrders";
import SellerEarnings from "./seller/SellerEarnings";
import MyProducts from "./seller/MyProducts";
import EditProduct from "./seller/EditProduct";
import Coupons from "./pages/Coupons";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Hero />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product" element={<Product />} />
          <Route
            path="/products"
            element={
              <ProtectedUserRoute>
                <Products />
              </ProtectedUserRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/sale-product/:id" element={<SaleProductDetail />} />
          <Route path="/offer/:id" element={<OfferDetail />} />
          <Route
            path="/cart"
            element={
              <ProtectedUserRoute>
                <Cart />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedUserRoute>
                <Payment />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/receipt"
            element={
              <ProtectedUserRoute>
                <Receipt />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedUserRoute>
                <History />
              </ProtectedUserRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/best-selling"
            element={
              <ProtectedUserRoute>
                <BestSelling />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/coupons"
            element={
              <ProtectedUserRoute>
                <Coupons />
              </ProtectedUserRoute>
            }
          />
          <Route path="/seller-page" element={<SellerPage />} />
          <Route path="/fees-commission" element={<FeesAndCommission />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/seller-help" element={<SellerHelpPage />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-orders" element={<SellerOrders />} />
          <Route path="/seller-earnings" element={<SellerEarnings />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route
            path="/seller-dashboard/my-products"
            element={<MyProducts />}
          />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
