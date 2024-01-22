import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from './CartProvider';
function CartHeader() {
    var _a = useCartContext(), classNameCartHeader = _a.classNameCartHeader, classNameBtnClose = _a.classNameBtnClose, onClickClose = _a.onClickClose;
    return (_jsxs("div", { className: classNameCartHeader, children: [_jsx(FontAwesomeIcon, { icon: faShoppingCart }), " Shopping cart", _jsx("button", { type: "button", className: classNameBtnClose, "aria-label": "Close", onClick: onClickClose, children: _jsx(FontAwesomeIcon, { icon: faTimes }) })] }));
}
export default CartHeader;
