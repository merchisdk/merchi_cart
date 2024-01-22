var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
function Collapse(_a) {
    var isOpen = _a.isOpen, children = _a.children;
    var _b = __read(useState(isOpen ? 'auto' : '0'), 2), height = _b[0], setHeight = _b[1];
    var ref = useRef(null);
    useEffect(function () {
        setHeight(isOpen ? "".concat(ref.current.scrollHeight, "px") : '0');
    }, [isOpen]);
    return (_jsx("div", { className: "merchi-collapse ".concat(isOpen ? 'show' : ''), ref: ref, style: { transition: 'height 0.35s ease', overflow: 'hidden', height: height }, children: children }));
}
export default Collapse;
