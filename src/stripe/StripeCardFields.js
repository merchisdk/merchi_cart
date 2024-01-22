var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import StripePaymentButtons from './StripePaymentButtons';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useStripe, useElements, } from '@stripe/react-stripe-js';
import { loadStripe, } from '@stripe/stripe-js';
import { CARD_ELEMENT_OPTIONS } from './utils';
function InnerForm(_a) {
    var doStripePayment = _a.doStripePayment, doStripePaymentRequestForButton = _a.doStripePaymentRequestForButton, cart = _a.cart, loadingStripePayment = _a.loadingStripePayment, loadingStripePaymentButtons = _a.loadingStripePaymentButtons, PaymentButton = _a.PaymentButton, setLoadingStripePayment = _a.setLoadingStripePayment;
    var inputClass = 'form-control p-t-8 stripe-form-control';
    var stripe = useStripe();
    var elements = useElements();
    function paymentStart(e) {
        var card = elements.getElement(CardNumberElement);
        setLoadingStripePayment(true);
        e.preventDefault();
        if (!stripe || !elements) {
            setLoadingStripePayment(false);
            return;
        }
        doStripePayment({ card: card, cart: cart, stripe: stripe });
    }
    return (_jsx(_Fragment, { children: loadingStripePaymentButtons ? (_jsxs("div", { style: { alignItems: 'center' }, children: [_jsx("div", { style: {
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }, children: _jsx("div", { className: 'spinner-merchi-small' }) }), _jsx("p", { style: { fontSize: '14px', fontWeight: 600, textAlign: 'center' }, children: "Processing payment" })] })) : (_jsxs(_Fragment, { children: [!!(cart && doStripePaymentRequestForButton) && (_jsx(StripePaymentButtons, { doPaymentRequest: function (event) {
                        return doStripePaymentRequestForButton(stripe, event);
                    }, cart: cart })), _jsxs("form", { onSubmit: paymentStart, children: [_jsx("label", { children: _jsx("strong", { children: "Card details" }) }), _jsxs("div", { className: 'd-flex flex-column gap-1', children: [_jsx(CardNumberElement, __assign({ className: inputClass }, CARD_ELEMENT_OPTIONS)), _jsx(CardExpiryElement, __assign({ className: inputClass }, CARD_ELEMENT_OPTIONS)), _jsx(CardCvcElement, __assign({ className: inputClass }, CARD_ELEMENT_OPTIONS)), _jsx(PaymentButton, { loading: loadingStripePayment })] })] })] })) }));
}
function FormStripeCardFields(_a) {
    var doStripePayment = _a.doStripePayment, doStripePaymentRequestForButton = _a.doStripePaymentRequestForButton, cart = _a.cart, loadingStripePayment = _a.loadingStripePayment, loadingStripePaymentButtons = _a.loadingStripePaymentButtons, PaymentButton = _a.PaymentButton, setLoadingStripePayment = _a.setLoadingStripePayment, stripePubKey = _a.stripePubKey;
    return stripePubKey ? (_jsx(Elements, { stripe: loadStripe(stripePubKey), children: _jsx(InnerForm, { doStripePayment: doStripePayment, doStripePaymentRequestForButton: doStripePaymentRequestForButton, cart: cart, loadingStripePayment: loadingStripePayment, loadingStripePaymentButtons: loadingStripePaymentButtons, setLoadingStripePayment: setLoadingStripePayment, PaymentButton: PaymentButton }) })) : (_jsx("div", { style: { alignItems: 'center' }, children: _jsx("div", { style: {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
                textAlign: 'center',
            }, children: _jsx("div", { className: 'spinner-merchi-small' }) }) }));
}
export default FormStripeCardFields;
