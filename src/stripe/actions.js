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
export function stripeInitPromise(urlApi) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(urlApi, "stripe/master_publishable_key/"), { method: 'GET', mode: 'cors' }).then(function (response) { return response.key; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function createPaymentIntent(urlApi, cart, paymentMethodType) {
    return __awaiter(this, void 0, void 0, function () {
        var id, token, fetchOptions, queryParams, queryString, uri, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = cart.id, token = cart.token;
                    fetchOptions = {
                        method: 'GET',
                        mode: 'cors',
                    };
                    queryParams = [['cart_token', token]];
                    if (paymentMethodType) {
                        queryParams.push(['payment_method_types', paymentMethodType]);
                    }
                    queryString = new URLSearchParams(queryParams).toString();
                    uri = "stripe/payment_intent/cart/".concat(id, "/");
                    url = "".concat(urlApi).concat(uri, "?").concat(queryString);
                    return [4 /*yield*/, fetch(url, fetchOptions)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to create payment intent.");
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function checkPaymentIntnetIsComplete(urlApi, cart) {
    return __awaiter(this, void 0, void 0, function () {
        var url, fetchOptions, queryString, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "stripe/payment_intent/cart/complete/".concat(cart.id, "/");
                    fetchOptions = {
                        method: 'GET',
                        mode: 'cors',
                    };
                    queryString = new URLSearchParams({ cart_token: cart.token }).toString();
                    return [4 /*yield*/, fetch("".concat(urlApi).concat(url, "?").concat(queryString), fetchOptions)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to check if payment intent is complete.");
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function stripeCardFormSubmit(urlApi, stripe, card, cart) {
    return __awaiter(this, void 0, void 0, function () {
        var intent, stripePayment, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, createPaymentIntent(urlApi, cart)];
                case 1:
                    intent = _a.sent();
                    return [4 /*yield*/, stripe.confirmCardPayment(intent.stripeClientSecret, { payment_method: { card: card } })];
                case 2:
                    stripePayment = _a.sent();
                    if (stripePayment.error) {
                        throw new Error(stripePayment.error.message || 'Stripe connect unknown error');
                    }
                    return [4 /*yield*/, checkPaymentIntnetIsComplete(urlApi, cart)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    e_1 = _a.sent();
                    throw e_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function stripePaymentButtonSubmit(urlApi, stripe, cart, paymentMethodEvent) {
    return __awaiter(this, void 0, void 0, function () {
        var complete, paymentMethod, intent, stripePayment, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    complete = paymentMethodEvent.complete, paymentMethod = paymentMethodEvent.paymentMethod;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, createPaymentIntent(urlApi, cart)];
                case 2:
                    intent = _a.sent();
                    return [4 /*yield*/, stripe.confirmCardPayment(intent.stripeClientSecret, { payment_method: paymentMethod.id }, { handleActions: false })];
                case 3:
                    stripePayment = _a.sent();
                    if (stripePayment.error) {
                        throw new Error(stripePayment.error.message || 'Stripe unknown error');
                    }
                    complete('success');
                    return [4 /*yield*/, checkPaymentIntnetIsComplete(urlApi, cart)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5:
                    e_2 = _a.sent();
                    complete('fail');
                    throw e_2;
                case 6: return [2 /*return*/];
            }
        });
    });
}
