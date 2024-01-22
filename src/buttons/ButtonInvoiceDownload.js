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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
import { generatePublicInvoicePdf } from '../utilities/invoice';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { alertError } from '../store';
function ButtonInvoiceDownload() {
    var _a = useCartContext(), classNameBtnDownloadInvoice = _a.classNameBtnDownloadInvoice, urlApi = _a.urlApi;
    var _b = useSelector(function (s) { return s.stateCartPayment; }).invoice, invoice = _b === void 0 ? {} : _b;
    var unpaid = invoice.unpaid;
    var _c = __read(useState(false), 2), loading = _c[0], setLoading = _c[1];
    function generate(receipt) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, generatePublicInvoicePdf(urlApi, invoice, receipt)];
                    case 2:
                        _a.sent();
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        alertError(e_1.message);
                        setLoading(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsx(_Fragment, { children: unpaid ? (_jsxs("button", { className: classNameBtnDownloadInvoice, disabled: loading, onClick: function () { return generate(false); }, children: [loading ? (_jsx(CgSpinner, { fontSize: '1.1rem', className: 'animate_spin mr-2' })) : (_jsx(FaFileInvoiceDollar, { fontSize: '1.1rem', className: 'mr-2' })), "Download Invoice"] })) : (_jsxs("button", { className: classNameBtnDownloadInvoice, disabled: loading, onClick: function () { return generate(true); }, children: [loading ? (_jsx(CgSpinner, { fontSize: '1.1rem', className: 'animate_spin mr-2' })) : (_jsx(FaFileInvoiceDollar, { fontSize: '1.1rem', className: 'mr-2' })), "Download Receipt"] })) }));
}
export default ButtonInvoiceDownload;
