import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import orderReducer from "../features/order/orderSlice";
import itemReducer from "../features/orderItem/itemSlice";
import productReducer from "../features/product/productSlice";

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  item: itemReducer,
  product: productReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;