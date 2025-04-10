import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleProducts: [
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UY327_FMwebp_QL65_.jpg",
      title: "Wireless Headphones",
      price: 100,
      discount: 20,
    },
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UY327_FMwebp_QL65_.jpg",
      title: "Wireless Headphones",
      price: 100,
      discount: 20,
    },
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UY327_FMwebp_QL65_.jpg",
      title: "Wireless Headphones",
      price: 100,
      discount: 20,
    },
    {
      id: "1",
      image: "https://m.media-amazon.com/images/I/618Z0eTNM6L._AC_UY327_FMwebp_QL65_.jpg",
      title: "Wireless Headphones",
      price: 100,
      discount: 20,
    },
    {
      id: "2",
      image: "https://m.media-amazon.com/images/I/61Y8u2y5XOL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Smartwatch",
      price: 200,
      discount: 30,
    },
    {
      id: "3",
      image: "https://m.media-amazon.com/images/I/71o6CU8MqVL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Bluetooth Speaker",
      price: 150,
      discount: 25,
    },
    {
      id: "4",
      image: "https://m.media-amazon.com/images/I/51J1tnBewIL._AC_UY327_FMwebp_QL65_.jpg",
      title: "Gaming Mouse",
      price: 80,
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
