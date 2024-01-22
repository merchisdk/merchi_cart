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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonPay } from '../buttons';
import { callbackCreditCardPaymentSuccess } from '../store';
import FormStripeCardFields from './StripeCardFields';
import { stripeCardFormSubmit, stripeInitPromise, stripePaymentButtonSubmit, } from './actions';
import { companyStripePubKeyOrTestPubKey } from './utils';
import { useCartContext } from '../CartProvider';
import { alertError } from '../store';
function PaymentButton(_a) {
    var loading = _a.loading;
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    return (_jsx("div", { children: _jsx(ButtonPay, { cart: cart, loading: loading }) }));
}
var badgeTestMode = _jsx("div", { style: { color: 'red' }, children: "Test mode" });
function StripeCardForm() {
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    var urlApi = useCartContext().urlApi;
    var domain = cart.domain;
    var company = domain.company;
    var hasCompanyPubKey = Boolean(company.isStripeValid && companyStripePubKeyOrTestPubKey(company));
    var companyPubKey = hasCompanyPubKey ? companyStripePubKeyOrTestPubKey(company) : '';
    var canUseConnect = !!company.stripeAccountId;
    var _a = __read(useState(false), 2), loadingStripePayment = _a[0], setLoadingStripePayment = _a[1];
    var _b = __read(useState(false), 2), loadingStripePaymentButtons = _b[0], setLoadingStripePaymentButtons = _b[1];
    var url = urlApi || '';
    function doStripePayment(r) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingStripePayment(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, stripeCardFormSubmit(url, r.stripe, r.card, cart)];
                    case 2:
                        response = _a.sent();
                        callbackCreditCardPaymentSuccess(response);
                        setLoadingStripePayment(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        setLoadingStripePayment(false);
                        alertError(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function doStripePaymentRequestForButton(stripe, event) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingStripePaymentButtons(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, stripePaymentButtonSubmit(url, stripe, cart, event)];
                    case 2:
                        response = _a.sent();
                        callbackCreditCardPaymentSuccess(response);
                        setLoadingStripePaymentButtons(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        setLoadingStripePaymentButtons(false);
                        alertError(e_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    var _c = __read(useState(companyPubKey), 2), stripePublicKey = _c[0], setStripePublicKey = _c[1];
    useEffect(function () {
        if (!stripePublicKey && canUseConnect)
            stripeInitPromise(url).then(setStripePublicKey);
    }, [stripePublicKey, canUseConnect]);
    return (_jsxs(_Fragment, { children: [company.isTesting && badgeTestMode, _jsx(FormStripeCardFields, { doStripePayment: doStripePayment, doStripePaymentRequestForButton: doStripePaymentRequestForButton, cart: cart, loadingStripePayment: loadingStripePayment, loadingStripePaymentButtons: loadingStripePaymentButtons, PaymentButton: PaymentButton, setLoadingStripePayment: setLoadingStripePayment, stripePubKey: stripePublicKey })] }));
}
export default StripeCardForm;
