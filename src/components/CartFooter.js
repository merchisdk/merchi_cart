import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from "../CartProvider";
export default function CartFooter(_a) {
    var children = _a.children;
    var classNameCartFooter = useCartContext().classNameCartFooter;
    return (_jsx("div", { className: classNameCartFooter, children: children }));
}
