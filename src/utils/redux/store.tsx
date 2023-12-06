/* eslint-disable @typescript-eslint/no-unused-vars */
import {configureStore} from '@reduxjs/toolkit';
import settingReducer from './setting/settingReducer';
import userDataReducers from './userData/userDataReducers';

const store = configureStore({
  reducer: {
    setting: settingReducer,
    userDatas: userDataReducers,
  },
});

export default store;
