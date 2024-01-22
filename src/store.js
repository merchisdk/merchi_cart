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
import { batch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { sliceCart, tabIdCheckout, tabIdItem, tabIdItems, tabIdPaymentSuccess, } from './slices/sliceCart';
import { sliceCartAlert } from './slices/sliceCartAlert';
import sliceCartItem from './slices/sliceCartItem';
import { sliceCartPayment } from './slices/sliceCartPayment';
import { sliceCartShipment } from './slices/sliceCartShipment';
import sliceNewCustomerForm from './slices/sliceNewCustomerForm';
import sliceFormReturningCustomer from './slices/sliceFormReturningCustomer';
import reducersSquare from './square/slices/reducersSquare';
import sliceStripeCardForm from './stripe/slices/sliceStripeCardForm';
import { Merchi } from './MerchiSDK/merchi';
import { cartEmbed } from './utilities/helpers';
import { makeAddress } from './utilities/address';
import { getCartCookie as getMerchiCartCookie, setCartCookie, } from './utilities/cookie';
import { getCartShipmentGroupsAndQuotes, makeCart, makeCartItem, makeCartShipmentQuote, stripeIsValidAndActive, } from './utilities/cart';
import { makeUser, createNewCustomer, tryReturningCustomerEmail, } from './utilities/user';
import { appendStyleSheetText } from './utilities/helpers';
var merchi = new Merchi();
var merchiCartReducer = __assign(__assign({ stateCartAlert: sliceCartAlert.reducer, stateCartItem: sliceCartItem.reducer, stateCartPayment: sliceCartPayment.reducer, stateCartShipment: sliceCartShipment.reducer, stateCart: sliceCart.reducer, stateNewCustomerForm: sliceNewCustomerForm.reducer, stateFormReturningCustomer: sliceFormReturningCustomer.reducer }, reducersSquare), sliceStripeCardForm);
export var store = configureStore({
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware({ serializableCheck: false }); },
    reducer: merchiCartReducer,
});
function getStore() {
    return store.getState();
}
var _a = sliceCart.actions, deleteCartItem = _a.deleteCartItem, deleteCartItemError = _a.deleteCartItemError, deleteCartItemSuccess = _a.deleteCartItemSuccess, fetchCart = _a.fetchCart, fetchCartError = _a.fetchCartError, fetchCartSuccess = _a.fetchCartSuccess, fetchTheme = _a.fetchTheme, fetchThemeError = _a.fetchThemeError, fetchThemeSuccess = _a.fetchThemeSuccess, setCart = _a.setCart, setCartClient = _a.setCartClient, setDomainId = _a.setDomainId, setCartShipmentGroups = _a.setCartShipmentGroups;
function getCartToken() {
    return __awaiter(this, void 0, void 0, function () {
        var domainId, cartIdAndToken, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    domainId = getStore().stateCart.domainId;
                    if (!domainId) return [3 /*break*/, 2];
                    return [4 /*yield*/, getMerchiCartCookie(Number(domainId))];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = undefined;
                    _b.label = 3;
                case 3:
                    cartIdAndToken = _a;
                    return [2 /*return*/, cartIdAndToken && cartIdAndToken[1] ? cartIdAndToken[1] : undefined];
            }
        });
    });
}
function dispatch(method) {
    store.dispatch(method);
}
export function axtionSetCartClient(client) {
    dispatch(setCartClient(client));
}
export function setCartItem(cartItem, index) {
    batch(function () {
        if (cartItem && cartItem.id) {
            setActiveTab(tabIdItem);
        }
        else {
            setActiveTab(tabIdItems);
        }
        dispatch(sliceCartItem.actions.setCartItem({ cartItem: cartItem, index: index }));
    });
}
export function setActiveTab(tabId) {
    dispatch(sliceCart.actions.setActiveTab(tabId));
}
export function setActiveTabAndEditDisabled(settings) {
    dispatch(sliceCart.actions.setActiveTabAndEditDisabled(settings));
}
export function closeAlert() {
    dispatch(sliceCartAlert.actions.closeAlert());
}
export function closeClearCart() {
    dispatch(sliceCart.actions.setActiveTab(tabIdItems));
}
export function alertError(message) {
    dispatch(sliceCartAlert.actions.showAlertDanger({ message: message, title: 'Error!' }));
}
function alertSuccess(message) {
    dispatch(sliceCartAlert.actions.showAlertSuccess({ message: message, title: 'Success!' }));
}
export function actionFetchTheme(id) {
    dispatch(fetchTheme());
    merchi.Domain.get(id, { embed: { activeTheme: { mainCss: {} } } })
        .then(function (domain) {
        return domain.activeTheme;
    })
        .then(function (theme) {
        appendStyleSheetText(theme.mainCss, function () { return dispatch(fetchThemeSuccess()); });
    })
        .catch(function (e) {
        alertError(e.errorMessage);
        dispatch(fetchThemeError());
    });
}
function cartAndCookie() {
    return __awaiter(this, void 0, void 0, function () {
        var domainId, cart;
        return __generator(this, function (_a) {
            domainId = getStore().stateCart.domainId;
            cart = makeCart({ domain: { id: domainId } }, true);
            return [2 /*return*/, cart.create({ embed: cartEmbed })
                    .then(function (c) {
                    if (domainId) {
                        setCartCookie(Number(domainId), c.toJson(), undefined);
                    }
                    return c.toJson();
                })
                    .then(function (cJson) {
                    dispatch(fetchCartSuccess(cJson));
                })
                    .catch(function (e) {
                    batch(function () {
                        alertError(e.errorMessage);
                        dispatch(fetchCartError());
                    });
                })];
        });
    });
}
export function createAndSetNewCartCookie() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(fetchCart());
                    return [4 /*yield*/, cartAndCookie()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function doClearCart() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(setCart({}));
                    closeClearCart();
                    return [4 /*yield*/, createAndSetNewCartCookie()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function patchCartItem(cartItem) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, doPatch, doPatchError, doPatchSuccess, cartToken, cart, _b, stateCartItem, index, cartEnt, cartItemEnt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    data = getStore();
                    _a = sliceCartItem.actions, doPatch = _a.patchCartItem, doPatchError = _a.patchCartItemError, doPatchSuccess = _a.patchCartItemSuccess;
                    return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _c.sent();
                    cart = data.stateCart.cart, _b = data.stateCartItem, stateCartItem = _b.cartItem, index = _b.index;
                    cartEnt = makeCart(cart, false, cartToken);
                    cartItemEnt = makeCartItem(cartItem, true);
                    cartItemEnt.id = stateCartItem.id;
                    cartEnt.cartItems[index] = cartItemEnt;
                    dispatch(doPatch());
                    cartEnt.save({ embed: cartEmbed }).
                        then(function (c) {
                        batch(function () {
                            alertSuccess('Item updated.');
                            dispatch(setCart(c.toJson()));
                            dispatch(doPatchSuccess());
                            setActiveTab(tabIdItems);
                        });
                    }).
                        then(function () {
                        setCartItem({}, 0);
                    }).
                        catch(function (e) {
                        batch(function () {
                            alertError(e.errorMessage);
                            dispatch(doPatchError());
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
export function actionDeleteCartItem(index) {
    return __awaiter(this, void 0, void 0, function () {
        var data, cartToken, cart, cartEnt, cartItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = getStore();
                    return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _a.sent();
                    cart = data.stateCart.cart;
                    cartEnt = makeCart(cart, false, cartToken);
                    cartItems = cartEnt.cartItems;
                    cartItems.splice(index, 1);
                    cartEnt.cartItems = cartItems;
                    dispatch(deleteCartItem(index));
                    cartEnt.save({ embed: cartEmbed }).
                        then(function (c) {
                        dispatch(deleteCartItemSuccess(c.toJson()));
                    }).
                        catch(function (e) {
                        batch(function () {
                            alertError(e.errorMessage);
                            dispatch(deleteCartItemError());
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
export function updateCartShipmentAddress() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, updateShipmentAddressError, updateShipmentAddressSuccess, cartToken, _b, cart, address, receiverAddress, cartEnt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = sliceCartShipment.actions, updateShipmentAddressError = _a.updateShipmentAddressError, updateShipmentAddressSuccess = _a.updateShipmentAddressSuccess;
                    return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _c.sent();
                    _b = getStore(), cart = _b.stateCart.cart, address = _b.stateCartShipment.receiverAddress;
                    receiverAddress = makeAddress(address, true);
                    cartEnt = makeCart(cart, false, cartToken);
                    cartEnt.receiverAddress = receiverAddress;
                    cartEnt.save({ embed: cartEmbed }).
                        then(function (c) {
                        dispatch(setCart(c.toJson()));
                        getCartShipmentGroupsAndQuotes(c.toJson()).
                            then(function (cartWithShipmentGroups) {
                            var cartJson = cartWithShipmentGroups;
                            batch(function () {
                                dispatch(setCartShipmentGroups(cartJson.shipmentGroups));
                                dispatch(updateShipmentAddressSuccess(cartJson.shipmentGroups));
                            });
                        });
                    }).
                        catch(function (e) {
                        batch(function () {
                            alertError(e.errorMessage);
                            dispatch(updateShipmentAddressError());
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
export function saveCartShipmentAddressAndGoToNextTab(values) {
    return __awaiter(this, void 0, void 0, function () {
        var address, receiverNotes, _a, saveShipmentAddress, saveShipmentAddressError, saveShipmentAddressSuccess, cartToken, cart, receiverAddress, cartEnt;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    address = values.receiverAddress, receiverNotes = values.receiverNotes;
                    _a = sliceCartShipment.actions, saveShipmentAddress = _a.saveShipmentAddress, saveShipmentAddressError = _a.saveShipmentAddressError, saveShipmentAddressSuccess = _a.saveShipmentAddressSuccess;
                    return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _b.sent();
                    cart = getStore().stateCart.cart;
                    dispatch(saveShipmentAddress());
                    receiverAddress = makeAddress(address, true);
                    cartEnt = makeCart(cart, false, cartToken);
                    cartEnt.receiverAddress = receiverAddress;
                    cartEnt.receiverNotes = receiverNotes;
                    cartEnt.save({ embed: cartEmbed }).
                        then(function (c) {
                        batch(function () {
                            dispatch(setCart(c.toJson()));
                            dispatch(saveShipmentAddressSuccess());
                            setActiveTabAndEditDisabled({ tabId: tabIdCheckout, tabIndexToSet: 2, disabled: false });
                        });
                    }).
                        catch(function (e) {
                        batch(function () {
                            alertError(e.errorMessage);
                            dispatch(saveShipmentAddressError());
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function attachClientToCart(clientJson) {
    return __awaiter(this, void 0, void 0, function () {
        var createNewSuccess, cartToken, cart, clientEnt, cartEnt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createNewSuccess = sliceNewCustomerForm.actions.createNewCustomerSuccess;
                    return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _a.sent();
                    cart = getStore().stateCart.cart;
                    clientEnt = makeUser({ id: clientJson.id });
                    cartEnt = makeCart(cart, false, cartToken);
                    cartEnt.client = clientEnt;
                    return [2 /*return*/, cartEnt.save({ embed: cartEmbed }).
                            then(function (c) {
                            dispatch(setCart(c.toJson()));
                            dispatch(createNewSuccess());
                        })];
            }
        });
    });
}
export function setSelectedShipmentQuote(groupIndex, quote) {
    return __awaiter(this, void 0, void 0, function () {
        var cartToken, cart, _a, setSelected, setSelectedShipmentQuoteError, setSelectedShipmentQuoteSuccess, cartEnt, cartShipmentQuote;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCartToken()];
                case 1:
                    cartToken = _b.sent();
                    cart = getStore().stateCart.cart;
                    _a = sliceCartShipment.actions, setSelected = _a.setSelectedShipmentQuote, setSelectedShipmentQuoteError = _a.setSelectedShipmentQuoteError, setSelectedShipmentQuoteSuccess = _a.setSelectedShipmentQuoteSuccess;
                    cartEnt = makeCart(cart, false, cartToken);
                    cartShipmentQuote = makeCartShipmentQuote(quote);
                    cartEnt.shipmentGroups[groupIndex].selectedQuote = cartShipmentQuote;
                    dispatch(setSelected({ groupIndex: groupIndex, quote: quote }));
                    cartEnt.save({ embed: cartEmbed }).
                        then(function (c) {
                        dispatch(setCart(c.toJson()));
                        dispatch(setSelectedShipmentQuoteSuccess());
                    }).
                        catch(function (e) {
                        batch(function () {
                            alertError(e.errorMessage);
                            dispatch(setSelectedShipmentQuoteError());
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var _b = sliceFormReturningCustomer.actions, setReturningCustomerError = _b.setReturningCustomerError, tryReturning = _b.tryReturningCustomer, tryReturningCustomerError = _b.tryReturningCustomerError, tryReturningCustomerSuccess = _b.tryReturningCustomerSuccess;
export function tryReturningCustomer(urlApi, data) {
    var emailAddress = data.emailAddress;
    dispatch(tryReturning());
    tryReturningCustomerEmail(urlApi, emailAddress)
        .then(function (r) { return attachClientToCart({
        emailAddresses: [{ emailAddress: emailAddress }],
        id: r.user_id,
    }); })
        .then(function () { return dispatch(tryReturningCustomerSuccess()); })
        .catch(function (e) {
        return batch(function () {
            alertError(e.errorMessage);
            dispatch(tryReturningCustomerError());
            dispatch(setReturningCustomerError(true));
        });
    });
}
var _c = sliceNewCustomerForm.actions, createNew = _c.createNewCustomer, createNewError = _c.createNewCustomerError, createNewSuccess = _c.createNewCustomerSuccess;
export function actionCreateNewCustomer(urlApi, customerJson) {
    var cart = getStore().stateCart.cart;
    var domainId = cart && cart.domain && cart.domain.id;
    dispatch(createNew());
    var user = makeUser(__assign(__assign({}, customerJson), { registeredUnderDomains: [{ id: domainId }] }), true);
    var error = function (e) { return batch(function () {
        alertError(e.errorMessage);
        dispatch(createNewError(e.errorMessage));
    }); };
    createNewCustomer(urlApi, __assign(__assign({}, customerJson), { registeredUnderDomains: [{ id: domainId }] }))
        .then(function (r) {
        var userJson = r.user;
        attachClientToCart(userJson);
    })
        .then(function () { return dispatch(createNewSuccess()); })
        .catch(error);
}
var creditCardPaySuccess = sliceCartPayment.actions.creditCardPaySuccess;
export function callbackCreditCardPaymentSuccess(invoiceJson) {
    batch(function () {
        dispatch(creditCardPaySuccess(invoiceJson));
        setActiveTab(tabIdPaymentSuccess);
    });
}
function convertToJson(ent) {
    return __awaiter(this, void 0, void 0, function () {
        var json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ent.toJson()];
                case 1:
                    json = _a.sent();
                    return [2 /*return*/, json];
            }
        });
    });
}
function updateCartValues(cartJson) {
    var initCartShipmentSlice = sliceCartShipment.actions.initCartShipmentSlice;
    dispatch(sliceCart.actions.fetchCartSuccess(cartJson));
    dispatch(initCartShipmentSlice(cartJson));
}
function getCart(cartIdAndToken) {
    var cartSettingsInvalid = sliceCart.actions.cartSettingsInvalid;
    var id = Number(cartIdAndToken[0]);
    if (cartIdAndToken[1]) {
        merchi.cartToken = cartIdAndToken[1];
    }
    dispatch(fetchCart());
    merchi.Cart.get(id, { embed: cartEmbed })
        .then(convertToJson)
        .then(function (cart) {
        if (stripeIsValidAndActive(cart)) {
            updateCartValues(cart);
        }
        else {
            console.error("MErhci cart error: Stripe payment " +
                "options have not been correctly set up. " +
                "Check the company profile payment options tab " +
                "to set and edit stripe payment options.");
            dispatch(cartSettingsInvalid());
        }
    })
        .catch(function (e) {
        createAndSetNewCartCookie();
    });
}
export function getMerchiCart(domainId) {
    return __awaiter(this, void 0, void 0, function () {
        var cartIdAndToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMerchiCartCookie(domainId)];
                case 1:
                    cartIdAndToken = _a.sent();
                    dispatch(setDomainId({ cartIdAndToken: cartIdAndToken, domainId: domainId }));
                    if (cartIdAndToken) {
                        getCart(cartIdAndToken);
                    }
                    else {
                        createAndSetNewCartCookie();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function isMerchiCartFetching() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, getStore().stateCart.fetchingCart];
        });
    });
}
export function getMerchiCartValues() {
    return __awaiter(this, void 0, void 0, function () {
        var cart, _a, cartItems, currency, subtotalCost, taxAmount, totalCost, cartItemsCount;
        return __generator(this, function (_b) {
            cart = getStore().stateCart.cart;
            _a = cart, cartItems = _a.cartItems, currency = _a.currency, subtotalCost = _a.subtotalCost, taxAmount = _a.taxAmount, totalCost = _a.totalCost;
            cartItemsCount = cartItems ? cartItems.length : 0;
            return [2 /*return*/, {
                    cart: cart,
                    cartItemsCount: cartItemsCount,
                    currency: currency || '',
                    subtotalCost: subtotalCost || 0,
                    taxAmount: taxAmount || 0,
                    totalCost: totalCost || 0,
                }];
        });
    });
}
export function doCartComplete() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(sliceCartPayment.actions.doCardComplete());
                    return [4 /*yield*/, cartAndCookie().then(function () { return location.reload(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function initMerchiCart(domainId) {
    getMerchiCart(domainId);
    if (window && window !== undefined) {
        window.getCart = function () { return getMerchiCart(domainId); };
        window.isMerchiCartFetching = isMerchiCartFetching;
        window.getMerchiCartValues = getMerchiCartValues;
    }
}
