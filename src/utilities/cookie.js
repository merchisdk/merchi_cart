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
import { isUndefined } from 'lodash';
import { isBrowser } from "browser-or-node";
export function getCookie(name, defaultValue) {
    return __awaiter(this, void 0, void 0, function () {
        var searchPrefix, cookies, i, cookie;
        return __generator(this, function (_a) {
            if (!isBrowser) {
                return [2 /*return*/, ''];
            }
            searchPrefix = name + '=';
            cookies = document.cookie.split(';');
            for (i = 0; i < cookies.length; ++i) {
                cookie = cookies[i];
                cookie = cookie.replace(/^\s*/, '');
                if (cookie.indexOf(searchPrefix) === 0) {
                    return [2 /*return*/, cookie.substring(searchPrefix.length, cookie.length)];
                }
            }
            if (isUndefined(defaultValue)) {
                throw 'no such cookie present';
            }
            else {
                return [2 /*return*/, defaultValue];
            }
            return [2 /*return*/];
        });
    });
}
export function getCartCookie(domainId) {
    return __awaiter(this, void 0, void 0, function () {
        var idAndToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCookie("cart-".concat(domainId), null)];
                case 1:
                    idAndToken = _a.sent();
                    return [2 /*return*/, idAndToken ? idAndToken.split(',') : null];
            }
        });
    });
}
function setSessionCookie(name, value, domain) {
    return __awaiter(this, void 0, void 0, function () {
        var cookie, n;
        return __generator(this, function (_a) {
            if (!isBrowser) {
                return [2 /*return*/];
            }
            cookie = name + '=' + value;
            if (!!domain) {
                n = domain.indexOf(':');
                domain = domain.substring(0, n != -1 ? n : domain.length);
                // remove trailing slash and path, if they exists
                n = domain.indexOf('/');
                domain = domain.substring(0, n != -1 ? n : domain.length);
                cookie += '; Domain=' + domain;
            }
            else {
                cookie += '; Domain=' + '.' + location.hostname;
            }
            cookie += '; path=/';
            document.cookie = cookie;
            return [2 /*return*/];
        });
    });
}
export var setCartCookie = function (storeId, cart, domain) { return __awaiter(void 0, void 0, void 0, function () {
    var cookieValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookieValue = cart ? cart.id + ',' + cart.token : '';
                return [4 /*yield*/, setSessionCookie('cart-' + String(storeId), cookieValue, domain)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
