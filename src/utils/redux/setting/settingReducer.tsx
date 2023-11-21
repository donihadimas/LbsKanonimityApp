/* eslint-disable @typescript-eslint/no-unused-vars */
import toolkit, {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface SettingState {
  account: Array<AccountSetting | never>;
  application: Array<ApplicationSetting | never>;
}

const initialState: SettingState = {
  account: [],
  application: [],
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setAccountSetting: (state, action: PayloadAction<AccountSetting>) => {
      state.account = [action.payload];
    },
    updateAccountSetting: (state, action: PayloadAction<AccountSetting>) => {
      state.account = [...state.account, action.payload];
    },
    clearAccountSetting: (state, action: PayloadAction<AccountSetting>) => {
      state.account = [];
    },
    setApplicationSetting: (
      state,
      action: PayloadAction<ApplicationSetting>,
    ) => {
      state.application = [action.payload];
    },
    updateApplicationSetting: (
      state,
      action: PayloadAction<ApplicationSetting>,
    ) => {
      state.application = [...state.application, action.payload];
    },
    clearApplicationSetting: (
      state,
      action: PayloadAction<ApplicationSetting>,
    ) => {
      state.application = [];
    },
  },
});

export const {
  setAccountSetting,
  updateAccountSetting,
  clearAccountSetting,
  setApplicationSetting,
  updateApplicationSetting,
  clearApplicationSetting,
} = settingSlice.actions;
export default settingSlice.reducer;
