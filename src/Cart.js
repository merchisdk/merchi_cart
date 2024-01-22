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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import CartAlert from './CartAlert';
import CartHeader from './CartHeader';
import CartTotals from './CartTotals';
import CartProvider, { useCartContext } from './CartProvider';
import { ButtonBack, ButtonClearCart, ButtonNextDynamic, } from './buttons';
import { CartFooter, CartPaymentSettingsInvalid, LoadingTemplate, } from './components';
import { PanelCartItems, PanelCartShipment, PanelClearCart, PanelClientCheckout, PanelEditCartItem, PanelPaymentSuccess, } from './panels';
import { tabIdClearCart, tabIdItem, tabIdPaymentSuccess, } from './slices/sliceCart';
import { actionFetchTheme, initMerchiCart, } from './store';
function CartComponents() {
    var _a = useCartContext(), domainId = _a.domainId, includeTheme = _a.includeTheme, initialiseCart = _a.initialiseCart;
    var _b = useSelector(function (s) { return s.stateCart; }), activeTab = _b.activeTab, cartSettingsInvalid = _b.cartSettingsInvalid, fetchingCart = _b.fetchingCart;
    React.useEffect(function () {
        if (initialiseCart && domainId) {
            if (includeTheme) {
                actionFetchTheme(domainId);
            }
            initMerchiCart(domainId);
        }
    }, [domainId, includeTheme, initialiseCart]);
    return (_jsxs(_Fragment, { children: [_jsx(CartHeader, {}), _jsx(CartAlert, {}), fetchingCart ? (_jsx(LoadingTemplate, {})) : cartSettingsInvalid ? (_jsx(CartPaymentSettingsInvalid, {})) : (_jsxs("div", { className: 'merchi-tab-pane', children: [_jsx(PanelClearCart, {}), _jsx(PanelEditCartItem, {}), _jsx(PanelCartItems, {}), _jsx(PanelCartShipment, {}), _jsx(PanelClientCheckout, {}), _jsx(PanelPaymentSuccess, {}), ![tabIdItem, tabIdClearCart, tabIdPaymentSuccess].includes(activeTab) &&
                        _jsxs(_Fragment, { children: [_jsx(CartFooter, { children: _jsx(CartTotals, {}) }), _jsxs(CartFooter, { children: [_jsx(ButtonClearCart, {}), _jsx(ButtonBack, {}), _jsx(ButtonNextDynamic, {})] })] })] }))] }));
}
export default function Cart(props) {
    return (_jsx(CartProvider, __assign({}, props, { children: _jsxs(Provider, { store: store, children: [_jsx(CartComponents, {}), _jsx(CartHeader, {}), _jsx(CartAlert, {})] }) })));
}
