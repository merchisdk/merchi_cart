import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { actionSquarePaymentProcess } from './actions';
import { currencyMap } from '../utilities/currency';
import { callbackCreditCardPaymentSuccess } from '../store';
function SquareCard() {
    var cart = useSelector(function (s) { return s.stateCart; }).cart;
    var currency = cart.currency, domain = cart.domain, totalCost = cart.totalCost;
    var company = domain.company;
    var dispatch = useDispatch();
    function ButtonText() {
        return (_jsxs("span", { children: ["Pay ", currencyMap[currency], totalCost, _jsx("small", { children: " / inc tax" })] }));
    }
    var squareWebLocationId = company.squareWebLocationId;
    return squareWebLocationId ?
        (_jsx(PaymentForm
        /**
         * Identifies the calling form with a verified application ID generated from
         * the Square Application Dashboard.
         */
        , { 
            /**
             * Identifies the calling form with a verified application ID generated from
             * the Square Application Dashboard.
             */
            applicationId: SQUARE_APPLICATION_ID, 
            /**
             * Invoked when payment form receives the result of a tokenize generation
             * request. The result will be a valid credit card or wallet token, or an error.
             */
            cardTokenizeResponseReceived: function (token, buyer) {
                return actionSquarePaymentProcess(dispatch, cart, token.token, callbackCreditCardPaymentSuccess);
            }, 
            /**
             * Identifies the location of the merchant that is taking the payment.
             * Obtained from the Square Application Dashboard - Locations tab.
             */
            locationId: squareWebLocationId, children: _jsx(CreditCard, { children: _jsx(ButtonText, {}) }) }))
        :
            _jsx(_Fragment, {});
}
export default SquareCard;
