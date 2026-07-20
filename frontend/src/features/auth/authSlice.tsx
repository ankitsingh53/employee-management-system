import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, User } from './authTypes';

const initialState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      // console.log(action)
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;