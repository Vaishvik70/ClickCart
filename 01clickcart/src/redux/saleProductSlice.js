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
    {
      id: "5",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVKEqvgqQMxX9rIJ7Ki9lB6ImUeyTcaVpaXXNHd2_Dw1HFFtDvvSEhLGXo_vSuOOiN6u_u9h3Lsu8RnrozYFYNfIHMsagxQq7kOl4tVvGJJctghvOpmIO_lA",
      title: "Headphones",
      price: 1599,
      discount: 15,
    },
    {
      id: "6",
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRTzYK-lkKSKO-Exoz3QohRKth3399_xAKb218ZmUVsHN0bWkVvsTK378p73rmz_nxRt94_zDEWL5R2xHUay6k8bpMI1sjc2kKrCwcYyzAnjK9SX5q5f9Fx&usqp=CAc",
      title: "Mobile Phone",
      price: 10000,
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
