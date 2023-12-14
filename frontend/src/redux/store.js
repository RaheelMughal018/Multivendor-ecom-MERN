import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";

//reducers

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
