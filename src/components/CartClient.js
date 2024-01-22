import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from 'react-redux';
import { axtionSetCartClient } from '../store';
import { primaryEmail, primaryPhone, } from '../utilities/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../buttons/Button';
import Title from './Title';
import { useCartContext } from '../CartProvider';
export function ClientInfo(_a) {
    var client = _a.client;
    var classNameListClientInfo = useCartContext().classNameListClientInfo;
    var _b = client.name, name = _b === void 0 ? 'Returning customer' : _b;
    var emailAddress = primaryEmail(client) || 'Email not shown';
    var phoneNumber = primaryPhone(client) || 'Phone number not shown';
    return (_jsxs("ul", { className: classNameListClientInfo, children: [_jsx("li", { children: name }), _jsx("li", { children: emailAddress }), _jsx("li", { children: phoneNumber })] }));
}
function CartClient(_a) {
    var client = _a.client;
    var dispatch = useDispatch();
    function clearClient() {
        axtionSetCartClient(null);
    }
    return (_jsxs("div", { children: [_jsx(Title, { icon: faUserCircle, Title: 'Checkout as' }), _jsx(ClientInfo, { client: client }), _jsxs(Button, { onClick: clearClient, children: [_jsx(FontAwesomeIcon, { icon: faUserTimes }), " Change"] })] }));
}
export default CartClient;
