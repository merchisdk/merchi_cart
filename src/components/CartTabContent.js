import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
export default function CartTabContent(_a) {
    var children = _a.children;
    var classNameCartTab = useCartContext().classNameCartTab;
    return (_jsx("div", { className: classNameCartTab, children: children }));
}
