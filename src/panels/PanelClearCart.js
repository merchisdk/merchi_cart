import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { doClearCart, closeClearCart } from '../store';
import { tabIdClearCart } from '../slices/sliceCart';
import { Button } from '../buttons';
import { CartBody, CartTabPanel } from '../components';
import { useCartContext } from '../CartProvider';
function PanelClearCart() {
    var _a = useCartContext(), classNameBtnDanger = _a.classNameBtnDanger, classNameBtnDefault = _a.classNameBtnDefault, classNameClearCartContainer = _a.classNameClearCartContainer, classNameClearCartText = _a.classNameClearCartText;
    return (_jsx(CartTabPanel, { tabId: tabIdClearCart, children: _jsx(CartBody, { children: _jsxs("div", { className: classNameClearCartContainer, children: [_jsx("h2", { children: _jsx(FontAwesomeIcon, { icon: faTrashAlt }) }), _jsx("h3", { children: "Clear Cart" }), _jsx("p", { className: classNameClearCartText, children: "Are you sure you would like to clear this cart?" }), _jsx("p", { children: _jsx(Button, { className: classNameBtnDefault, onClick: closeClearCart, children: "Cancel" }) }), _jsx("p", { children: _jsx(Button, { className: classNameBtnDanger, onClick: doClearCart, children: "Yes, clear cart" }) })] }) }) }));
}
export default PanelClearCart;
