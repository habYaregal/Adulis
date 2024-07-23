import { createSlice } from '@reduxjs/toolkit';

const userFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const initialState = {
  isAuth: !!localStorage.getItem('isAuth'),
  user: userFromLocalStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
      state.user = userFromLocalStorage();
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
