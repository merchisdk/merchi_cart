import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
function InputAcceptUserTermsAndConditions(_a) {
    var isChecked = _a.isChecked, setIsChecked = _a.setIsChecked;
    var _b = useCartContext(), classNameCartFormCheckbox = _b.classNameCartFormCheckbox, classNameCartFormGroupCheckbox = _b.classNameCartFormGroupCheckbox, classNameCartFormLabelCheckbox = _b.classNameCartFormLabelCheckbox;
    return (_jsx("div", { onClick: function () { return setIsChecked(!isChecked); }, className: classNameCartFormGroupCheckbox, children: _jsxs("label", { className: classNameCartFormLabelCheckbox, children: [_jsx("input", { className: classNameCartFormCheckbox, defaultChecked: isChecked, type: 'checkbox' }), ' ', _jsxs("span", { style: { fontSize: '14px' }, className: 'text-muted', children: ["I agree to the user profile", ' ', _jsx("a", { href: '/terms-and-conditions/user/', target: '_blank', children: "terms & conditions" }), "."] })] }) }));
}
export default InputAcceptUserTermsAndConditions;
