import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import todoSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
