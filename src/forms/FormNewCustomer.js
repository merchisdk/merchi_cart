var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import InputAcceptUserTermsAndConditions from './InputAcceptUserTermsAndConditions';
import { actionCreateNewCustomer } from '../store';
import { Button } from '../buttons';
import InputSelect from './InputSelect';
import InputText from './InputText';
import { useCartContext } from '../CartProvider';
import { phoneOptions } from '../utilities/helpers';
import InputError from './InputError';
export var emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;
export function FormCustomerNew() {
    var _a = useCartContext(), classNameBtnPrimary = _a.classNameBtnPrimary, classNameCartFormGroup = _a.classNameCartFormGroup, showUserTermsAndConditions = _a.showUserTermsAndConditions, urlApi = _a.urlApi;
    var _b = useSelector(function (s) { return s.stateNewCustomerForm; }), loading = _b.creatingNewCustomer, error = _b.serverError;
    var _c = __read(React.useState(true), 2), acceptConditions = _c[0], setAcceptConditions = _c[1];
    var _d = useForm({
        defaultValues: {
            emailAddresses: [{ emailAddress: '' }],
            name: '',
            phoneNumbers: [{ code: 'AU', number: '' }],
            registeredAsGuest: false,
        },
    }), control = _d.control, handleSubmit = _d.handleSubmit, watch = _d.watch;
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, actionCreateNewCustomer(urlApi, __assign({}, values))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // Basic validation for phone. Checking that phone is a number. Can make more complex if we want.
    function validatePhone() {
        var phone = watch('phoneNumbers.0.number');
        if (isNaN(phone))
            return 'Phone number must be a number';
        else
            return true;
    }
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx(InputText, { control: control, label: 'Full Name', name: 'name', placeholder: 'John Smith', rules: { required: 'Full name is required.' } }), _jsx(InputText, { control: control, label: 'Email', name: 'emailAddresses[0].emailAddress', placeholder: 'john@example.com', rules: {
                    required: 'Email is required.',
                    validate: emailValidation,
                } }), _jsxs("div", { style: { display: 'flex', gap: '1rem' }, children: [_jsx("div", { style: { flexGrow: 1 }, children: _jsx(InputSelect, { control: control, label: 'Country Code', name: 'phoneNumbers[0].code', options: phoneOptions }) }), _jsx("div", { style: { flexGrow: 1 }, children: _jsx(InputText, { control: control, label: 'Phone Number', name: 'phoneNumbers[0].number', placeholder: '0400 000 000', rules: {
                                required: 'Phone number is required',
                                validate: validatePhone,
                            }, type: 'phone' }) })] }), showUserTermsAndConditions && (_jsxs("div", { className: classNameCartFormGroup, children: [_jsx(InputAcceptUserTermsAndConditions, { isChecked: acceptConditions, setIsChecked: setAcceptConditions }), !acceptConditions && (_jsx(InputError, { error: {
                            message: 'You must agree to the user profile terms and conditions to proceed.',
                        } }))] })), _jsx(InputError, { error: error || {} }), _jsx("div", { className: classNameCartFormGroup, children: _jsx(Button, { className: classNameBtnPrimary, disabled: loading, type: 'submit', children: loading ? 'Loading...' : 'Submit' }) })] }));
}
export default FormCustomerNew;
