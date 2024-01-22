import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
import { currencyMap } from '../utilities/currency';
import Button from './Button';
function ButtonPay(_a) {
    var cart = _a.cart, loading = _a.loading;
    var classNameBtnPay = useCartContext().classNameBtnPay;
    var currency = cart.currency, totalCost = cart.totalCost;
    return (_jsx(Button, { className: classNameBtnPay, disabled: loading, type: 'submit', children: loading ? (_jsx("span", { children: "Loading..." })) : (_jsxs("span", { children: ["Pay ", currencyMap[currency], totalCost, _jsx("small", { children: " / inc tax" })] })) }));
}
export default ButtonPay;
