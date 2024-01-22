var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { createSlice } from '@reduxjs/toolkit';
var sliceSquareAlerts = createSlice({
    initialState: {
        alerts: [],
    },
    name: 'stateSquareAlerts',
    reducers: {
        alertError: function (state, action) {
            state.alerts = __spreadArray(__spreadArray([], __read(state.alerts), false), [{ alertType: 'danger',
                    message: action.payload,
                    title: 'Error!' }], false);
        },
        alertRemove: function (state, action) {
            state.alerts.splice(action.payload, 1);
        },
        alertSuccess: function (state, action) {
            state.alerts = __spreadArray(__spreadArray([], __read(state.alerts), false), [{ alertType: 'success',
                    message: action.payload,
                    title: 'Success!' }], false);
        },
    },
});
export default sliceSquareAlerts;
