import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { CheckoutContainer, InnerContainer, } from '../components/containers';
import { tabIdPaymentSuccess } from '../slices/sliceCart';
import { doCartComplete } from '../store';
import { companyPrimaryAddress } from '../utilities/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonInvoiceDownload } from '../buttons';
import { CartBody, CartTabPanel } from '../components';
import { useCartContext } from '../CartProvider';
function PanelPaymentSuccess() {
    var _a = useCartContext(), classNameBtnPrimary = _a.classNameBtnPrimary, customSuccessMessage = _a.customSuccessMessage, urlTrackingPage = _a.urlTrackingPage;
    var _b = useSelector(function (s) { return s.stateCartPayment; }), cartCompleteLoading = _b.cartCompleteLoading, invoice = _b.invoice;
    var domain = invoice.domain, id = invoice.id, unpaid = invoice.unpaid;
    var email = domain && domain.company ? companyPrimaryAddress(domain.company) : null;
    return (_jsx(CartTabPanel, { tabId: tabIdPaymentSuccess, children: _jsxs(CartBody, { children: [_jsx(CheckoutContainer, { children: _jsxs(InnerContainer, { children: [_jsx("h2", { children: _jsx(FontAwesomeIcon, { icon: faCheckCircle }) }), _jsxs("h3", { children: ["Order #", id] }), _jsx("h4", { children: "Payment Received!" }), customSuccessMessage ? (_jsx("p", { className: 'merchi-cart-success-message ', children: customSuccessMessage })) : (_jsxs("p", { className: 'merchi-cart-success-message ', children: ["Your order #", id, " is being processed and you should receive an email from us shortly. If you haven't heard from us within 24 hours please feel free to contact us", email ? " at ".concat(email.emailAddress, ".") : '.'] })), !unpaid && _jsx("p", { children: _jsx(ButtonInvoiceDownload, {}) }), _jsx("p", { children: _jsx(Button, { className: classNameBtnPrimary, disabled: cartCompleteLoading, onClick: doCartComplete, children: cartCompleteLoading ? 'Loading...' : 'Done' }) })] }) }), urlTrackingPage &&
                    _jsx("iframe", { style: { height: '1px', left: '0px', width: '1px' }, src: urlTrackingPage })] }) }));
}
export default PanelPaymentSuccess;
