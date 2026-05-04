import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { accessToken } from "../../authService";
import { getUserProfile } from "../../api/auth";
import { User } from "../../types";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSuccessfulLogin: (
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setSuccessfulLogin, logout, setInitialized, setUserData } =
  authSlice.actions;

export const checkAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    dispatch(setInitialized());
    return;
  }

  try {
    const userData = await getUserProfile();
    const currentToken = accessToken.value || "";
    if (currentToken) {
      dispatch(
        setSuccessfulLogin({
          token: currentToken,
          user: userData,
        }),
      );
    }
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(setInitialized());
  }
};
export default authSlice.reducer;
