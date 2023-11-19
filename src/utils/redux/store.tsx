/* eslint-disable @typescript-eslint/no-unused-vars */
import {configureStore} from '@reduxjs/toolkit';
import settingReducer from './setting/settingReducer';

const store = configureStore({
  reducer: {
    setting: settingReducer,
  },
});

export default store;
