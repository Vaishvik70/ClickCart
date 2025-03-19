// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productReducer from "./productSlice";
import authReducer from "../slices/authSlice";
import saleProductReducer from "../redux/saleProductSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
    saleProducts: saleProductReducer,
  },
});

export default store;
