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
  name: 'stateCartAlert',
  reducers: {
    closeAlert: (state: any) => {
      state.alert.show = false;
    },
    setAlert: (state: any, action: PayloadAction<any>) => {
      state.alert = action.payload;
    },
    showAlertDanger: (state: any, action: PayloadAction<any>) => {
      state.alert = {
        ...action.payload,
        icon: faExclamationTriangle,
        show: true,
        type: 'danger',
      };
    },
    showAlertSuccess: (state: any, action: PayloadAction<any>) => {
      state.alert = {
        ...action.payload,
        icon: faCheckCircle,
        show: true,
        type: 'success',
      };
    },
  },
});
