import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const sliceCartAlert = createSlice({
  initialState: {
    alert: {
      icon: faInfoCircle,
      message: '',
      show: false,
      title: '',
      type: 'info',
    },
  },
  name: 'cartAlertState',
  reducers: {
    closeAlert: (state: any) => {
      state.alert.show = false;
    },
    setAlert: (state: any, action: PayloadAction<any>) => {
      state.alert = action.payload;
    },
    showAlertDanger: (state: any, action: PayloadAction<any>) => {
      state.alert = action.payload;
      state.alert.icon = faExclamationTriangle;
      state.alert.show = true;
      state.alert.type = 'danger';
    },
    showAlertSuccess: (state: any, action: PayloadAction<any>) => {
      state.alert = action.payload;
      state.alert.icon = faCheckCircle;
      state.alert.show = true;
      state.alert.type = 'success';
    },
  },
});
