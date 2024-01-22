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
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../slices/sliceCart';
import NavTab from './NavTab';
function CartNav() {
    var classNameCartNav = useCartContext().classNameCartNav;
    var tabs = useSelector(function (s) { return s.stateCart; }).tabs;
    return (_jsx("div", { className: classNameCartNav, children: tabs.filter(function (tab) { return tab.tabId !== tabIdPaymentSuccess; }).
            map(function (tab, index) {
            return _createElement(NavTab, __assign({}, tab, { key: "".concat(index, "-tab") }));
        }) }));
}
export default CartNav;
