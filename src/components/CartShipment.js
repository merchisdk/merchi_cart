import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import Title from './Title';
import { sliceCart, tabIdShipment } from '../slices/sliceCart';
import { addressInOneLine } from '../utilities/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../buttons';
import { useCartContext } from '../CartProvider';
function CartShipment(_a) {
    var cart = _a.cart;
    var _b = useCartContext(), classNameBtnDefault = _b.classNameBtnDefault, classNameListContainer = _b.classNameListContainer, classNameListUnstyled = _b.classNameListUnstyled;
    var receiverAddress = cart.receiverAddress, receiverNotes = cart.receiverNotes;
    var address = receiverAddress ? receiverAddress : null;
    var dispatch = useDispatch();
    function openShipmentTab() {
        dispatch(sliceCart.actions.setActiveTab(tabIdShipment));
    }
    return (_jsxs("div", { className: classNameListContainer, children: [_jsx(Title, { icon: faTruck, Title: 'Ship to' }), _jsxs("ul", { className: classNameListUnstyled, style: { fontSize: '15px', marginBottom: '1rem' }, children: [_jsx("li", { children: _jsx("span", { style: { display: 'inline-block', marginLeft: 28 }, children: address ? addressInOneLine(address) : 'Shipping address not set' }) }), _jsx("li", { children: receiverNotes })] }), _jsxs(Button, { onClick: openShipmentTab, className: classNameBtnDefault, children: [_jsx(FontAwesomeIcon, { icon: faEdit }), " ", address ? ' Change' : ' Set'] })] }));
}
export default CartShipment;
