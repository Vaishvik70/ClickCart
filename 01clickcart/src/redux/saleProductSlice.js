import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleProducts: [
    {
      id: "1",
      image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Wireless Headphones",
      price: 100,
      discount: 20,
    },
    {
      id: "2",
      image: "https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Smartwatch",
      price: 200,
      discount: 30,
    },
    {
      id: "3",
      image: "https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=252&fit=crop&h=408",
      title: "Bluetooth Speaker",
      price: 150,
      discount: 25,
    },
    {
      id: "4",
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
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
