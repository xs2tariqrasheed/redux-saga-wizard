import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectHome = state => state.home || initialState;

export const selectUsers = createSelector(
  [selectHome],
  homeState => homeState.users.data,
);

export const selectUsersLoading = createSelector(
  [selectHome],
  homeState => homeState.users.loading,
);
