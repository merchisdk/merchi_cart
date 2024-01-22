import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Alert } from './components';
import { closeAlert } from './store';
import { useCartContext } from './CartProvider';
function CartAlert() {
    var classNameBtnClose = useCartContext().classNameBtnClose;
    var alert = useSelector(function (s) { return s.stateCartAlert; }).alert;
    var icon = alert.icon, message = alert.message, show = alert.show, Title = alert.Title;
    return (_jsx(_Fragment, { children: show && (_jsxs(Alert, { alertType: alert.type, children: [icon &&
                    _jsx(FontAwesomeIcon, { icon: icon }), " ", _jsx("strong", { children: Title }), " ", message, _jsx("button", { type: "button", className: classNameBtnClose, "data-bs-dismiss": "alert", "aria-label": "Close", onClick: closeAlert, children: _jsx(FontAwesomeIcon, { icon: faTimes }) })] })) }));
}
export default CartAlert;
