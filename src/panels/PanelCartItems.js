import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import CartItemRow from '../components/CartItemRow';
import { tabIdItems } from '../slices/sliceCart';
import CartNav from '../tabs/CartNav';
import { CartBody, CartTabContent, CartTableContainer, CartTabPanel, NoCartItems, Table, } from '../components';
function PanelCartItems() {
    var _a = useSelector(function (s) { return s.stateCart; }), cart = _a.cart, deletingCartItemIndex = _a.deletingCartItemIndex;
    var cartItems = cart.cartItems ? cart.cartItems : [];
    var hasItems = cartItems.length > 0;
    return (_jsx(CartTabPanel, { tabId: tabIdItems, children: _jsxs(CartBody, { children: [_jsx(CartNav, {}), _jsx(CartTabContent, { children: hasItems ? (_jsx(CartTableContainer, { children: _jsxs(Table, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { scope: 'col', className: 'merchi-cart-item-table-head', children: "Product" }), _jsx("th", { scope: 'col', className: 'merchi-cart-item-table-head-right', children: "Quantity" }), _jsx("th", { scope: 'col', className: 'merchi-cart-item-table-head-right', children: "Price" }), _jsx("th", { scope: 'col', className: 'merchi-cart-item-table-head-right', children: "Actions" })] }) }), _jsx("tbody", { children: cartItems.map(function (cartItem, index) {
                                        return _jsx(CartItemRow, { cartItem: cartItem, index: index, loading: deletingCartItemIndex === index }, cartItem.id);
                                    }) })] }) })) : (_jsx(NoCartItems, {})) })] }) }));
}
export default PanelCartItems;
