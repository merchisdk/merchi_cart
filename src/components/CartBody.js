import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
export default function CartBody(_a) {
    var children = _a.children, style = _a.style;
    var classNameCartBody = useCartContext().classNameCartBody;
    return (_jsx("div", { className: classNameCartBody, style: style, children: children }));
}
