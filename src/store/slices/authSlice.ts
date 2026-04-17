import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getTasks } from "../../api/tasks";
import { TodoStatus } from "../../types";
import { accessToken } from "../../authService";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSuccessfulLogin: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setSuccessfulLogin, logout, setInitialized } = authSlice.actions;

export const checkAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    dispatch(setInitialized());
    return;
  }

  try {
    await getTasks(TodoStatus.ALL);
    const currentToken: any = accessToken.value;
    dispatch(setSuccessfulLogin(currentToken));
  } catch (error) {
    console.log(error);
    dispatch(logout());
  } finally {
    dispatch(setInitialized());
  }
};
export default authSlice.reducer;
