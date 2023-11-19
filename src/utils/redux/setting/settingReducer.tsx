/* eslint-disable @typescript-eslint/no-unused-vars */
import toolkit from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const {createSlice} = toolkit;

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
    updateAccountSetting: (state, action: PayloadAction<AccountSetting>) => {
      state.account = [...state.account, action.payload];
    },
    clearAccountSetting: (state, action: PayloadAction<AccountSetting>) => {
      state.account = [];
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
  updateAccountSetting,
  clearAccountSetting,
  updateApplicationSetting,
  clearApplicationSetting,
} = settingSlice.actions;
export default settingSlice.reducer;
