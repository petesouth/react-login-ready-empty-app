import {
  createSlice,
  PayloadAction,
  configureStore,
  Slice,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// State Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthorizedUser: boolean;
  isLoginOtp: boolean;
  isLoginOtpConfirmed: boolean;
  isForgotPassword: boolean;
  isForgotPasswordOtp: boolean;
  isForgotPasswordConfirmed: boolean;
  authToken: string | null;
  userData: User | null;
}

const initialState: AuthState = {
  isAuthorizedUser: false,
  isLoginOtp: false,
  isLoginOtpConfirmed: false,
  isForgotPassword: false,
  isForgotPasswordOtp: false,
  isForgotPasswordConfirmed: false,
  authToken: null,
  userData: null,
};

// Slice
const authSlice: Slice<AuthState> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    logout: (state: AuthState) => {
      state = { ...initialState };
    },
    loginotp: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    loginotpconfirmed: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    fogotpassword: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    fogotpasswordotp: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    fogotpasswordotpconfirmed: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    setauthtoken: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
    setuserdata: (state: AuthState, action: PayloadAction<AuthState>) => {
      state = { ...state, ...action.payload };
    },
  },
});



// Login Hooks ---------
export const { login, 
               logout, 
               loginotp, 
               loginotpconfirmed, 
               forgotpassword, 
               forgotpasswordotp, 
               forgotpasswordotpconfirmed,
               setauthtoken, 
               setuserdata } = authSlice.actions;

// Define a type that represents the entire application state.
export type AppState = ReturnType<typeof initializeStore> extends {
  getState: () => infer S;
} ? S : never;

export type GenericDispatch = ThunkDispatch<AppState, any, AnyAction>;

// Store initialization
export const initializeStore = (reducers: any = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      ...reducers,
    },
  });
};

// Custom Hook
interface UseAuthStoreType {
  dispatch: GenericDispatch;
  state: AppState;
  actions: typeof authSlice.actions;
}

export const useAuthStore = (): UseAuthStoreType => {
  const dispatch = useDispatch<GenericDispatch>();
  const state = useSelector((s: AppState) => s); // We give the state the AppState type here.

  return {
    dispatch,
    state,
    actions: authSlice.actions,
  };
};