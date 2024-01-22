import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from "../CartProvider";
export default function Table(_a) {
    var children = _a.children;
    var classNameTable = useCartContext().classNameTable;
    return (_jsx("table", { className: classNameTable, children: children }));
}
