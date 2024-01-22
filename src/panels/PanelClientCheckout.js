import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { tabIdCheckout } from '../slices/sliceCart';
import CartNav from '../tabs/CartNav';
import { CheckoutContainer, InnerContainer, } from '../components/containers';
import CartClient from '../components/CartClient';
import CartShipment from '../components/CartShipment';
import { CartBody, CartTabPanel, Title, } from '../components';
import FormNewCustomer from '../forms/FormNewCustomer';
import FormReturningCustomer from '../forms/FormReturningCustomer';
import FormSquarePayment from '../forms/FormSquarePayment';
import FormStripePayment from '../forms/FormStripePayment';
import { faUserPlus, faUserTag } from '@fortawesome/free-solid-svg-icons';
function PanelClientCheckout() {
    var _a = useSelector(function (s) { return s.stateCart; }), cart = _a.cart, needsShipping = _a.needsShipping;
    var client = cart.client, domain = cart.domain;
    var company = domain && domain.company;
    return (_jsxs(CartTabPanel, { tabId: tabIdCheckout, children: [_jsx(CartNav, {}), _jsx(CartBody, { style: { paddingTop: '2rem' }, children: client && client.id > -1 ?
                    _jsxs(_Fragment, { children: [_jsx(CheckoutContainer, { children: _jsx(InnerContainer, { paddingBottom: '3rem', children: _jsx(CartClient, { client: client }) }) }), needsShipping &&
                                _jsx(CheckoutContainer, { children: _jsx(InnerContainer, { paddingBottom: '3rem', children: _jsx(CartShipment, { cart: cart }) }) }), Boolean(company) && company.acceptSquare &&
                                _jsx(CheckoutContainer, { children: _jsx(InnerContainer, { paddingBottom: '3rem', children: _jsx(FormSquarePayment, {}) }) }), _jsx(CheckoutContainer, { children: _jsx(InnerContainer, { children: _jsx(FormStripePayment, {}) }) })] })
                    :
                        _jsxs(_Fragment, { children: [_jsx(CheckoutContainer, { children: _jsxs(InnerContainer, { paddingBottom: '3rem', children: [_jsx(Title, { icon: faUserPlus, Title: 'Checkout as new customer' }), _jsx(FormNewCustomer, {})] }) }), _jsx(CheckoutContainer, { children: _jsxs(InnerContainer, { paddingBottom: '3rem', children: [_jsx(Title, { icon: faUserTag, Title: 'Checkout as returning customer' }), _jsx(FormReturningCustomer, {})] }) })] }) })] }));
}
export default PanelClientCheckout;
