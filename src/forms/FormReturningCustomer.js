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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { tryReturningCustomer } from '../store';
import { Button } from '../buttons';
import InputError from './InputError';
import { useCartContext } from '../CartProvider';
var emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]/i;
function FormReturningCustomer() {
    var _a = useCartContext(), classNameBtnPrimary = _a.classNameBtnPrimary, classNameCartFormGroup = _a.classNameCartFormGroup, classNameCartFormInput = _a.classNameCartFormInput, urlApi = _a.urlApi;
    var _b = useSelector(function (s) { return s.stateFormReturningCustomer; }), returningCustomerError = _b.returningCustomerError, returningCustomerLoading = _b.returningCustomerLoading;
    var hookForm = useForm({ defaultValues: { emailAddress: '' } });
    var handleSubmit = hookForm.handleSubmit, errors = hookForm.formState.errors, getValues = hookForm.getValues, register = hookForm.register;
    function submit() {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = getValues();
                        return [4 /*yield*/, tryReturningCustomer(urlApi, values.emailAddress)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs("form", { onSubmit: handleSubmit(submit), children: [_jsxs("div", { className: classNameCartFormGroup, children: [_jsx("input", __assign({ className: classNameCartFormInput, placeholder: 'info@example.com', type: 'email' }, register('emailAddress', {
                        required: 'Email address required',
                        pattern: {
                            value: emailValidation,
                            message: 'Invalid email address'
                        }
                    }))), _jsx("small", { children: "If you are a returning customer please use the same email which you used previously." }), _jsx(InputError, { error: errors.emailAddress }), returningCustomerError && _jsx(InputError, { error: returningCustomerError })] }), _jsx("div", { className: classNameCartFormGroup, children: _jsx(Button, { className: classNameBtnPrimary, disabled: returningCustomerLoading, type: 'submit', children: returningCustomerLoading ? 'Loading...' : 'Submit' }) })] }));
}
export default FormReturningCustomer;
