var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, } from '@stripe/react-stripe-js';
function useOptions(paymentRequest) {
    var options = useMemo(function () { return ({
        paymentRequest: paymentRequest,
        style: {
            paymentRequestButton: {
                theme: 'dark',
                height: '48px',
                type: 'buy'
            }
        }
    }); }, [paymentRequest]);
    return options;
}
function usePaymentRequest(_a) {
    var options = _a.options, onPaymentMethod = _a.onPaymentMethod;
    var stripe = useStripe();
    var _b = __read(useState(null), 2), paymentRequest = _b[0], setPaymentRequest = _b[1];
    var _c = __read(useState(false), 2), canMakePayment = _c[0], setCanMakePayment = _c[1];
    useEffect(function () {
        if (stripe && paymentRequest === null) {
            var pr = stripe.paymentRequest(options);
            setPaymentRequest(pr);
        }
    }, [stripe, options, paymentRequest]);
    useEffect(function () {
        var subscribed = true;
        if (paymentRequest) {
            paymentRequest.canMakePayment().then(function (res) {
                if (res && subscribed) {
                    setCanMakePayment(true);
                }
            });
        }
        return function () {
            subscribed = false;
        };
    }, [paymentRequest]);
    useEffect(function () {
        if (paymentRequest) {
            paymentRequest.on('paymentmethod', onPaymentMethod);
        }
        return function () {
            if (paymentRequest) {
                paymentRequest.off('paymentmethod', onPaymentMethod);
            }
        };
    }, [paymentRequest, onPaymentMethod]);
    return canMakePayment ? paymentRequest : null;
}
function StripePaymentButtons(_a) {
    var doPaymentRequest = _a.doPaymentRequest, cart = _a.cart;
    var paymentRequest = usePaymentRequest({
        options: {
            country: cart.domain.company.country,
            currency: String(cart.currency).toLowerCase(),
            total: {
                label: "Merchi Cart #".concat(cart.id),
                amount: Math.round(cart.totalCost * 100)
            }
        },
        onPaymentMethod: doPaymentRequest
    });
    var options = useOptions(paymentRequest);
    if (!paymentRequest) {
        return null;
    }
    return (_jsx("div", { style: { marginBottom: '2rem', marginTop: '2rem' }, children: _jsx(PaymentRequestButtonElement, { className: 'PaymentRequestButton', options: options }) }));
}
export default StripePaymentButtons;
