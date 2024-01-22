import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
var InputError = function (_a) {
    var error = _a.error;
    var classNameCartInputError = useCartContext().classNameCartInputError;
    if (!error || !error.message) {
        return null;
    }
    return (_jsx("div", { className: classNameCartInputError, children: error.message }));
};
export default InputError;
