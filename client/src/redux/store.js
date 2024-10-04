import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
