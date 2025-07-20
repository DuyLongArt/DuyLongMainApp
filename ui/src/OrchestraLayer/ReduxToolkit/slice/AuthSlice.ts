import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
   username?:string;
   password?:string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  username:"",
  password:""
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    loginByUserPassword:(state,action:PayloadAction<{passwordBackend:string;usernameBackend:string,password:string,username:string}>)=>{
      if(action.payload.passwordBackend===action.payload.password&&action.payload.username===action.payload.usernameBackend){
        state.isAuthenticated=true;
      }
    }
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
export const AuthSlice =authSlice;