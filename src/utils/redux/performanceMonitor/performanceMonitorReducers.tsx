/* eslint-disable @typescript-eslint/no-unused-vars */
import toolkit, {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface PerformanceMonitor {
  rTimeCreateGeofence: Array<any | never>;
  rTimeNotifyInsideGeofencing: Array<any | never>;
}

const initialState: PerformanceMonitor = {
  rTimeCreateGeofence: [],
  rTimeNotifyInsideGeofencing: [],
};

export const PerfMonitorSlice = createSlice({
  name: 'perfMonitor',
  initialState,
  reducers: {
    setRTimeCreateGeofence: (state, action: PayloadAction<any>) => {
      state.rTimeCreateGeofence = [action.payload];
    },
    updateRTimeCreateGeofence: (state, action: PayloadAction<any>) => {
      state.rTimeCreateGeofence = [
        ...state.rTimeCreateGeofence,
        action.payload,
      ];
    },
    clearRTimeCreateGeofence: (state, action: PayloadAction<any>) => {
      state.rTimeCreateGeofence = [];
    },
    setRTimeNotifyInsideGeofencing: (state, action: PayloadAction<any>) => {
      state.rTimeNotifyInsideGeofencing = [action.payload];
    },
    updateRTimeNotifyInsideGeofencing: (state, action: PayloadAction<any>) => {
      state.rTimeNotifyInsideGeofencing = [
        ...state.rTimeNotifyInsideGeofencing,
        action.payload,
      ];
    },
    clearRTimeNotifyInsideGeofencing: (state, action: PayloadAction<any>) => {
      state.rTimeNotifyInsideGeofencing = [];
    },
  },
});

export const {
  setRTimeCreateGeofence,
  updateRTimeCreateGeofence,
  clearRTimeCreateGeofence,
  setRTimeNotifyInsideGeofencing,
  updateRTimeNotifyInsideGeofencing,
  clearRTimeNotifyInsideGeofencing,
} = PerfMonitorSlice.actions;
export default PerfMonitorSlice.reducer;
