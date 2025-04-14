import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleProducts: [
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UY327_FMwebp_QL65_.jpg",
      title: "Wireless Headphones",
      price: 1200,
      discount: 20,
    },
    {
      id: "2",
      image: "https://m.media-amazon.com/images/I/61Y8u2y5XOL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Smartwatch",
      price: 2599,
      discount: 30,
    },
    {
      id: "3",
      image: "https://m.media-amazon.com/images/I/71o6CU8MqVL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Bluetooth Speaker",
      price: 1000,
      discount: 25,
    },
    {
      id: "4",
      image: "https://m.media-amazon.com/images/I/51J1tnBewIL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Gaming Mouse",
      price: 549,
      discount: 15,
    },
  ],
};

const saleProductSlice = createSlice({
  name: "saleProducts",
  initialState,
  reducers: {},
});

export default saleProductSlice.reducer;
