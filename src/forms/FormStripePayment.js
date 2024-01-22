import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import StripeCardForm from '../stripe/StripeCardForm';
function FormStripePayment() {
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    var company = cart && cart.domain && cart.domain.company;
    return (_jsx(_Fragment, { children: Boolean(company) && _jsx(StripeCardForm, {}) }));
}
export default FormStripePayment;
