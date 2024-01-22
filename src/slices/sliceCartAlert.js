import { createSlice } from '@reduxjs/toolkit';
import { faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export var sliceCartAlert = createSlice({
    initialState: {
        alert: {
            icon: faInfoCircle,
            message: '',
            show: false,
            Title: '',
            type: 'info',
        },
    },
    name: 'stateCartAlert',
    reducers: {
        closeAlert: function (state) {
            state.alert.show = false;
        },
        setAlert: function (state, action) {
            state.alert = action.payload;
        },
        showAlertDanger: function (state, action) {
            state.alert = action.payload;
            state.alert.icon = faExclamationTriangle;
            state.alert.show = true;
            state.alert.type = 'danger';
        },
        showAlertSuccess: function (state, action) {
            state.alert = action.payload;
            state.alert.icon = faCheckCircle;
            state.alert.show = true;
            state.alert.type = 'success';
        },
    },
});
