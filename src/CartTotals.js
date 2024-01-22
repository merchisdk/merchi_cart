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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { formatCurrency } from './utilities/currency';
import { cartRequiresShipment } from './utilities/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Table } from './components';
import { useCartContext } from './CartProvider';
function CartTotal(props) {
    var attribute = props.attribute;
    var _a = useSelector(function (s) { return s; }), _b = _a.stateCart, cart = _b.cart, fetchingCart = _b.fetchingCart, loading = _b.loading, _c = _a.stateCartShipment, fetchingShipmentGroups = _c.fetchingShipmentGroups, fetchingShipmentQuote = _c.fetchingShipmentQuote;
    var domain = cart.domain;
    var company = domain ? domain.company : null;
    var currency = company ? company.defaultCurrency : 'AUD';
    var isLoading = fetchingCart ||
        fetchingShipmentGroups ||
        fetchingShipmentQuote ||
        loading;
    var money = cart[attribute] ? cart[attribute] : 0;
    return (_jsx("div", { style: { paddingRight: 8 }, children: isLoading ?
            _jsx(FontAwesomeIcon, { icon: faCircleNotch, spin: true })
            :
                "".concat(currency, " ").concat(formatCurrency(money, { currency: currency })) }));
}
function CostsTableRow(_a) {
    var attr = _a.attr, name = _a.name;
    var _b = useCartContext(), classNameCartTotalItem = _b.classNameCartTotalItem, classNameCartTotalItemPrice = _b.classNameCartTotalItemPrice;
    return (_jsxs("tr", { children: [_jsx("td", { className: classNameCartTotalItem, children: name }), _jsx("th", { className: classNameCartTotalItemPrice, children: _jsx(CartTotal, { attribute: attr }) })] }));
}
function CartTotals() {
    var _a = useCartContext(), classNameCartTotalContainer = _a.classNameCartTotalContainer, classNameCartTotalItemPrice = _a.classNameCartTotalItemPrice;
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    var cartItems = cart.cartItems ? cart.cartItems : [];
    return (_jsx("div", { className: classNameCartTotalContainer, children: _jsx(Table, { children: _jsxs("tbody", { children: [_jsx(CostsTableRow, { attr: 'cartItemsTotalCost', name: 'Subtotal' }), cartRequiresShipment(__assign(__assign({}, cart), { cartItems: cartItems })) &&
                        _jsx(CostsTableRow, { attr: 'shipmentTotalCost', name: 'Shipping' }), _jsx(CostsTableRow, { attr: 'totalCost', name: 'Total' }), _jsxs("tr", { children: [_jsx("td", {}), _jsx("td", { className: classNameCartTotalItemPrice, children: "Total price includes taxes" })] })] }) }) }));
}
export default CartTotals;
