import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { accessToken } from "../../authService";
import { getUserProfile } from "../../api/auth";

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
    await getUserProfile();
    const currentToken = accessToken.value;
    if (currentToken) {
      dispatch(setSuccessfulLogin(currentToken));
    }
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(setInitialized());
  }
};
export default authSlice.reducer;
