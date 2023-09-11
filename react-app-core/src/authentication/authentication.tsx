import {
  createSlice,
  PayloadAction,
  configureStore,
  Slice,
  AnyAction,
  ThunkDispatch,
  Store 
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
/*
Store initialization.  Pass in your apps slice reducers and they get added to the global store
that this method returns.  This store then gets set in your apps Provider.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {initializeStore} './react-app-core'; // Import your Redux store
import App from './App';


const store = initializeStore( { 
   example: exampleSlice.reducer,
   users: myUsersSlice.reducer,
   etc...
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

The auth namespace reducer is automatically added with your apps reducers.

const { dispatch, state } = useAppCoreState();

Is then how you access the data in your components.  (Replacing useSelect and useDispatch all over the place.)

*/
export const initializeStore = (reducers: any = {}) : Store => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      ...reducers,
    },
  });
};

// Custom Hook
interface AppCoreState {
  dispatch: GenericDispatch;
  state: AppState;
  actions: typeof authSlice.actions;
}

// The idea is to craete Slice Action Reducers mapped to name spaces for each reducer.
// This method then becomes a replacement for useSelect and useDispatch 
// The other reducers are added in the reducers paremater of the initalizeStore MEthod that sets the app stateup.
// 
export const useAppCoreState = (): AppCoreState => {
  const dispatch = useDispatch<GenericDispatch>();
  const state = useSelector((s: AppState) => s); // We give the state the AppState type here.

  return {
    dispatch,
    state,
    actions: authSlice.actions,
  };
};