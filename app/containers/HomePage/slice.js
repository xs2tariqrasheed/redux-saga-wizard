import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  users: { data: [], loading: false },
};

/* eslint-disable no-param-reassign */
const homePageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.users.loading = true;
    },
    fetchUsersSuccess(state, { payload }) {
      state.users.loading = false;
      state.users.data = payload;
    },
    fetchUsersError(state) {
      state.users.loading = false;
    },
  },
});

export const {
  fetchUsersError,
  fetchUsersRequest,
  fetchUsersSuccess,
} = homePageSlice.actions;

export const { reducer } = homePageSlice;
