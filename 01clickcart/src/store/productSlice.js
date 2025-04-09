import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { 
      id: "1",
      title: "Laptop", 
      price: "899",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/71n4BPDmUNL._SL1500_.jpg",
      onSale: "true",
      discount: "15",
      colors: ["black", "white", "gold"],
      stock: 15,
    },
    { 
      id: "2",
      title: "Laptop", 
      price: "999",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/81fvJauBWDL._SL1500_.jpg",
      onSale: "false",
      discount: "0",
      stock: 0,
    },
    { 
      id: "3",
      title: "Mobile Phone", 
      price: "999",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/61FMZ9rSZUL._SL1500_.jpg",
      onSale: "true",
      discount: "20",
      stock: 0,
    },
    { 
      id: "4",
      title: "Mobile Phone", 
      price: "499",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/61nxQ62qglL._SL1500_.jpg",
      onSale: "true",
      discount: "5",
      stock: 10,
    },
    { 
      id: "5",
      title: "Tablet", 
      price: "699",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/71TNY08QUYL._SL1500_.jpg",
      onSale: "false",
      discount: "0",
      stock: 43,
    },
    { 
      id: "6",
      title: "Tablet", 
      price: "299",
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/61ZEkMXevXL._SL1080_.jpg",
      onSale: "true",
      discount: "15",
      stock: 0,
    },
    { 
      id: "7",
      title: "Headphone", 
      price: "299",
      category: "Electronics Accessories",
      image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
      onSale: "false",
      discount: "0",
      stock: 34,
    },
    { 
      id: "8",
      title: "Earbuds", 
      price: "200",
      category: "Electronics Accessories",
      image: "https://m.media-amazon.com/images/I/61oCISLE+PL._SL1500_.jpg",
      onSale: "true",
      discount: "12",
      stock: 56,
    },
    { 
      id: "9",
      title: "Neakband", 
      price: "149",
      category: "Electronics Accessories",
      image: "https://m.media-amazon.com/images/I/61+SW9nDTEL._SL1500_.jpg",
      onSale: "false",
      discount: "0",
      stock: 23,
    },
    { 
      id: "10",
      title: "T-shirt", 
      price: "30",
      category: "Men's clothing",
      image: "https://m.media-amazon.com/images/I/41xlIZwU5KL._SX679_.jpg",
      onSale: "false",
      discount: "0",
      stock: 30,
    },
    { 
      id: "11",
      title: "Shirt", 
      price: "25",
      category: "Man's clothing",
      image: "https://m.media-amazon.com/images/I/716PKZxT4jL._SY879_.jpg",
      onSale: "false",
      discount: "0",
      stock: 50,
    },
    { 
      id: "12",
      title: "Shoes", 
      price: "200",
      category: "Man's shoes",
      image: "https://m.media-amazon.com/images/I/61r9oNywMeL._SY695_.jpg",
      onSale: "true",
      discount: "5",
      stock: 46,
    },
    { 
      id: "13",
      title: "Top", 
      price: "45",
      category: "Women's clothing",
      image: "https://m.media-amazon.com/images/I/81OS4czw-AL._SY879_.jpg",
      onSale: "true",
      discount: "10",
      stock: 23,
    },
    { 
      id: "14",
      title: "T-shirt", 
      price: "55",
      category: "Women's clothing",
      image: "https://m.media-amazon.com/images/I/51g8vaftUfL._SY879_.jpg",
      onSale: "true",
      discount: "8",
      stock: 25,
    },
    { 
      id: "15",
      title: "Kurti", 
      price: "49",
      category: "Women's clothing",
      image: "https://m.media-amazon.com/images/I/81p79Hfs3NL._SY879_.jpg",
      onSale: "true",
      discount: "12",
      stock: 40,
    },
    { 
      id: "16",
      title: "Shoes", 
      price: "359",
      category: "Women's shoes",
      image: "https://m.media-amazon.com/images/I/61izjVVYJpL._SX695_.jpg",
      onSale: "true",
      discount: "18",
      stock: 28,
    },
    { 
      id: "17",
      title: "Herry Potter", 
      price: "3999",
      category: "Books",
      image: "https://m.media-amazon.com/images/I/81uRUnI9Y3L.jpg",
      onSale: "true",
      discount: "18",
      stock: 12,
    },
    { 
      id: "18",
      title: "The Best of Sherlock Holmes", 
      price: "359",
      category: "Books",
      image: "https://m.media-amazon.com/images/I/51SVi8gKijL._SR480,440_.jpg",
      onSale: "true",
      discount: "18",
      stock: 30,
    },
    { 
      id: "19",
      title: "Solo Leveling Vol 1", 
      price: "359",
      category: "Books",
      image: "https://rukminim2.flixcart.com/image/1200/1200/xif0q/book/a/z/o/solo-leveling-vol-1-manga-original-imahy5kn373ztysh.jpeg",
      onSale: "true",
      discount: "10",
      stock: 0,
    },
    { 
      id: "20",
      title: "Marvel's Avengers", 
      price: "359",
      category: "Books",
      image: "https://m.media-amazon.com/images/I/71GLZcjDNKL._SL1280_.jpg",
      onSale: "true",
      discount: "18",
      stock: 20,
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSellerProducts: (state, action) => {
      state.products.push(action.payload); // Add new product
    },
  },
});

export const { addSellerProducts } = productSlice.actions;

export default productSlice.reducer;