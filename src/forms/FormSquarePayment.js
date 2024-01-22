import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import SquareCard from '../square/SquareCard';
function FormSquarePayment() {
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    var company = cart && cart.domain && cart.domain.company;
    return (_jsx(_Fragment, { children: Boolean(company) && company.acceptSquare && _jsx(SquareCard, {}) }));
}
export default FormSquarePayment;
