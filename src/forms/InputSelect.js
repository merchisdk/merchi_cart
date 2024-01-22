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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { v4 as uuidv4 } from 'uuid';
import { useController } from 'react-hook-form';
import InputError from './InputError';
import { useCartContext } from '../CartProvider';
function InputSelect(_a) {
    var control = _a.control, label = _a.label, name = _a.name, options = _a.options, rules = _a.rules;
    var _b = useCartContext(), classNameCartFormGroup = _b.classNameCartFormGroup, classNameCartFormInput = _b.classNameCartFormInput;
    var _c = useController({
        name: name,
        control: control,
        rules: rules,
        defaultValue: '',
    }), field = _c.field, _d = _c.fieldState, error = _d.error, invalid = _d.invalid;
    return (_jsxs("div", { className: classNameCartFormGroup, children: [label && _jsx("label", { children: label }), _jsx("select", __assign({}, field, { className: "".concat(classNameCartFormInput, " ").concat(invalid && ' is-invalid'), children: options.map(function (option, index) { return (_jsx("option", { value: option.value, children: option.label }, index + uuidv4())); }) })), _jsx(InputError, { error: error })] }));
}
export default InputSelect;
