import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceSquareAlerts = createSlice({
  initialState: {
    alerts: [],
  },
  name: 'stateSquareAlerts',
  reducers: {
    alertError: (state: any, action: PayloadAction<any>) => {
      state.alerts =
        [...state.alerts,
          { alertType: 'danger',
            message: action.payload,
            title: 'Error!' }];
    },
    alertRemove: (state: any, action: PayloadAction<any>) => {
      state.alerts.splice(action.payload, 1);
    },
    alertSuccess: (state: any, action: PayloadAction<any>) => {
      state.alerts =
        [...state.alerts,
          { alertType: 'success',
            message: action.payload,
            title: 'Success!' }];
    },
  },
});

export default sliceSquareAlerts;
