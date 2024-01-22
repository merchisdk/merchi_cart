import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
export default function Alert(_a) {
    var alertType = _a.alertType, children = _a.children;
    var _b = useCartContext(), classNameAlertError = _b.classNameAlertError, classNameAlertInfo = _b.classNameAlertInfo, classNameAlertSuccess = _b.classNameAlertSuccess, classNameAlertWarning = _b.classNameAlertWarning;
    var className = classNameAlertInfo;
    if (alertType === 'success') {
        className = classNameAlertSuccess;
    }
    if (alertType === 'error') {
        className = classNameAlertError;
    }
    if (alertType === 'warning') {
        className = classNameAlertWarning;
    }
    return (_jsx("div", { className: className, children: children }));
}
