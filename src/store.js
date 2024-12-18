import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import cartReducer from "./features/product/cartSlice";
import newsReducer from "./features/news/newsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    news: newsReducer,
  },
});
