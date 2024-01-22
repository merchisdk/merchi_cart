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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import MerchiProductForm from 'merchi_product_form';
import { tabIdItem } from '../slices/sliceCart';
import { patchCartItem } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonBack } from '../buttons';
import { CartBody, CartFooter, CartTabPanel, } from '../components';
import { useCartContext } from '../CartProvider';
function PanelEditCartItem() {
    var _a = useCartContext(), productFormClassNames = _a.productFormClassNames, classNameBtnPrimary = _a.classNameBtnPrimary, urlApi = _a.urlApi;
    var _b = useSelector(function (s) { return s.stateCartItem; }), cartItem = _b.cartItem, savingCartItem = _b.savingCartItem;
    var formId = 'edit-cart-item-form';
    function onSubmit(data) {
        patchCartItem(data.job);
    }
    return (_jsxs(CartTabPanel, { tabId: tabIdItem, children: [_jsx(CartBody, { style: { padding: '2rem' }, children: cartItem.id &&
                    _jsx(MerchiProductForm, __assign({ apiHost: urlApi, isCartItem: true, job: cartItem, initProduct: cartItem.product, onSubmit: onSubmit, productFormId: formId, hideRequestQuotationButton: true, hidePaymentUpfrontButton: true }, productFormClassNames)) }), _jsxs(CartFooter, { children: [_jsx(ButtonBack, {}), _jsxs(Button, { className: classNameBtnPrimary, disabled: savingCartItem, form: formId, children: [savingCartItem && _jsx(FontAwesomeIcon, { icon: faCircleNotch, spin: true }), savingCartItem ? ' Loading...' : 'Save'] })] })] }));
}
export default PanelEditCartItem;
