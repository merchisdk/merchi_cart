var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useController } from 'react-hook-form';
import { useCartContext } from '../CartProvider';
import InputError from './InputError';
function InputText(_a) {
    var control = _a.control, label = _a.label, name = _a.name, placeholder = _a.placeholder, _b = _a.type, type = _b === void 0 ? 'text' : _b, onChange = _a.onChange, rules = _a.rules;
    var _c = useCartContext(), classNameCartFormGroup = _c.classNameCartFormGroup, classNameCartFormInput = _c.classNameCartFormInput;
    var _d = useController({
        name: name,
        control: control,
        rules: rules,
        defaultValue: '',
    }), _e = _d.field, ref = _e.ref, inputProps = __rest(_e, ["ref"]), _f = _d.fieldState, error = _f.error, invalid = _f.invalid;
    return (_jsxs("div", { className: classNameCartFormGroup, children: [label && _jsx("label", { children: label }), _jsx("input", __assign({ className: "".concat(classNameCartFormInput, " ").concat(invalid && ' is-invalid'), type: type, placeholder: placeholder }, inputProps, { onChange: function (e) {
                    if (onChange)
                        onChange(e); // Check if custom onChange was provided
                    inputProps.onChange(e); // Default RHF onChange
                } })), _jsx(InputError, { error: error })] }));
}
export default InputText;
