import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
export default function CartTableContainer(_a) {
    var children = _a.children;
    var classNameTableContainer = useCartContext().classNameTableContainer;
    return (_jsx("div", { className: classNameTableContainer, children: children }));
}
