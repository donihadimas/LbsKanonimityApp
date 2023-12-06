/* eslint-disable @typescript-eslint/no-unused-vars */
import toolkit, {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserStates {
  users: Array<any | never>;
}

const initialState: UserStates = {
  users: [],
};

export const UsersSlice = createSlice({
  name: 'userDatas',
  initialState,
  reducers: {
    setUserDatas: (state, action: PayloadAction<any>) => {
      state.users = [action.payload];
    },
    updateUserDatas: (state, action: PayloadAction<any>) => {
      state.users = [...state.users, action.payload];
    },
    clearUserDatas: (state, action: PayloadAction<any>) => {
      state.users = [];
    },
  },
});

export const {setUserDatas, updateUserDatas, clearUserDatas} =
  UsersSlice.actions;
export default UsersSlice.reducer;
