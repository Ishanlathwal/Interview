import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./USER_REDUCER";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
