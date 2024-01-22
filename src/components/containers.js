import { jsx as _jsx } from "react/jsx-runtime";
export function CheckoutContainer(_a) {
    var children = _a.children, _b = _a.textAlign, textAlign = _b === void 0 ? 'center' : _b;
    return (_jsx("div", { style: {
            display: 'flex',
            justifyContent: 'center',
            textAlign: textAlign,
        }, children: children }));
}
export function InnerContainer(_a) {
    var children = _a.children, paddingBottom = _a.paddingBottom, paddingTop = _a.paddingTop, _b = _a.width, width = _b === void 0 ? 400 : _b;
    return (_jsx("div", { style: {
            padding: '3rem',
            paddingBottom: paddingBottom,
            paddingTop: paddingTop,
            width: width,
        }, children: children }));
}
