import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from "../CartProvider";
export default function LoadingTemplate(_a) {
    var height = _a.height;
    var _b = useCartContext(), classNameLoadingTemplate = _b.classNameLoadingTemplate, classNameLoadingTemplateContainer = _b.classNameLoadingTemplateContainer;
    var style = height ? { height: height } : {};
    return (_jsx("div", { className: classNameLoadingTemplateContainer, style: style, children: _jsx("div", { className: classNameLoadingTemplate }) }));
}
export function LoadingTemplateSm() {
    return _jsx(LoadingTemplate, { height: 300 });
}
