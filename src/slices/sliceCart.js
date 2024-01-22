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
import { faCheckCircle, faCreditCard, faMapMarkerAlt, faShoppingCart, } from '@fortawesome/free-solid-svg-icons';
export var tabIdClearCart = -2;
export var tabIdItem = -1;
export var tabIdItems = 0;
export var tabIdShipment = 1;
export var tabIdCheckout = 2;
export var tabIdPaymentSuccess = 3;
var tabItems = { disabled: false, icon: faShoppingCart, tabId: tabIdItems, name: 'Items' };
var tabShipment = { disabled: true, icon: faMapMarkerAlt, tabId: tabIdShipment, name: 'Address' };
var tabCheckout = { disabled: true, icon: faCreditCard, tabId: tabIdCheckout, name: 'Checkout' };
var tabCheckoutSuccess = {
    disabled: true,
    icon: faCheckCircle,
    tabId: tabIdPaymentSuccess,
    name: 'Success',
};
var initTabs = [tabItems, tabCheckout, tabCheckoutSuccess];
var tabsWithShipment = [tabItems, tabShipment, tabCheckout, tabCheckoutSuccess];
function setDisableTab(tab, disabled) {
    return __assign(__assign({}, tab), { disabled: disabled });
}
function cartHasShippmentGroupsAndAllHaveSelectedGroups(cart) {
    var shipmentGroups = cart.shipmentGroups ? cart.shipmentGroups : [];
    var haveSelectedQuotes = shipmentGroups.map(function (g) { return Boolean(g.selectedQuote); });
    return shipmentGroups.length && !haveSelectedQuotes.includes(false);
}
export function cartItemsNeedShipment(cart) {
    var _a = cart.cartItems, cartItems = _a === void 0 ? [] : _a;
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product && cartItems[i].product.needsShipping) {
            return true;
        }
    }
    return false;
}
export var sliceCart = createSlice({
    initialState: {
        activeTab: 0,
        cart: {},
        cartSettingsInvalid: false,
        deletingCartItemIndex: undefined,
        domainId: undefined,
        fetchingCart: false,
        loading: false,
        modalCartOpen: false,
        modalClearCartOpen: false,
        needsShipping: false,
        tabs: initTabs,
    },
    name: 'stateCart',
    reducers: {
        cartSettingsInvalid: function (state) {
            state.cartSettingsInvalid = true;
            state.fetchingCart = false;
        },
        deleteCartItem: function (state, action) {
            state.deletingCartItemIndex = action.payload;
        },
        deleteCartItemError: function (state) {
            state.deletingCartItemIndex = undefined;
        },
        deleteCartItemSuccess: function (state, action) {
            var cart = action.payload;
            var needsShipping = cartItemsNeedShipment(cart);
            state.deletingCartItemIndex = undefined;
            state.cart = cart;
            state.needsShipping = needsShipping;
            if (cart.cartItems.length === 0) {
                state.tabs = initTabs;
            }
            else {
                if (needsShipping) {
                    state.tabs = tabsWithShipment;
                    if (cart.cartItems.length) {
                        state.tabs[1] = setDisableTab(tabShipment, false);
                        if (cartHasShippmentGroupsAndAllHaveSelectedGroups(cart)) {
                            state.tabs[2] = setDisableTab(tabCheckout, false);
                        }
                    }
                }
                else {
                    state.tabs = initTabs;
                }
            }
        },
        fetchCart: function (state) {
            state.fetchingCart = true;
        },
        fetchCartError: function (state) {
            state.fetchingCart = false;
        },
        fetchCartSuccess: function (state, action) {
            var cart = action.payload;
            var needsShipping = cartItemsNeedShipment(__assign({}, cart));
            state.cart = cart;
            state.needsShipping = needsShipping;
            if (needsShipping) {
                var initShipment = __spreadArray([], __read(tabsWithShipment), false);
                if (cart.cartItems.length) {
                    initShipment[1] = setDisableTab(tabShipment, false);
                    if (cartHasShippmentGroupsAndAllHaveSelectedGroups(cart)) {
                        initShipment[2] = setDisableTab(tabCheckout, false);
                    }
                }
                state.tabs = initShipment;
            }
            else {
                state.tabs = initTabs;
            }
            state.activeTab = 0;
            state.fetchingCart = false;
        },
        fetchTheme: function (state) {
            state.loading = true;
        },
        fetchThemeError: function (state) {
            state.loading = false;
        },
        fetchThemeSuccess: function (state) {
            state.loading = false;
        },
        setActiveTab: function (state, action) {
            state.activeTab = action.payload;
        },
        setActiveTabAndEditDisabled: function (state, action) {
            var _a = action.payload, tabId = _a.tabId, tabIndexToSet = _a.tabIndexToSet, disabled = _a.disabled;
            state.activeTab = tabId;
            state.tabs[tabIndexToSet].disabled = disabled;
        },
        setCart: function (state, action) {
            state.cart = action.payload;
        },
        setCartShipmentGroups: function (state, action) {
            state.cart.shipmentGroups = action.payload;
        },
        setCartClient: function (state, action) {
            state.cart.client = action.payload;
        },
        setDomainId: function (state, action) {
            var domainId = action.payload.domainId;
            state.domainId = domainId;
        },
        toggleCartOpen: function (state) {
            state.modalCartOpen = !state.modalCartOpen;
        },
        toggleClearCart: function (state) {
            state.modalClearCartOpen = !state.modalClearCartOpen;
        },
    },
});
