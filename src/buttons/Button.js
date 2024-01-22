import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from "../CartProvider";
export default function Button(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, disabled = _a.disabled, form = _a.form, onClick = _a.onClick, _c = _a.type, type = _c === void 0 ? 'button' : _c;
    var classNameBtn = useCartContext().classNameBtn;
    return (_jsx("button", { className: "".concat(classNameBtn, " ").concat(className), disabled: disabled, form: form, onClick: onClick, type: type, children: children }));
}
