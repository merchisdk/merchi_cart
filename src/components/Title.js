import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartContext } from '../CartProvider';
export default function Title(_a) {
    var icon = _a.icon, title = _a.title;
    var classNameCartTitle = useCartContext().classNameCartTitle;
    return (_jsxs("div", { className: classNameCartTitle, children: [typeof icon === 'string' ? (_jsx("i", { className: "".concat(icon, " fa-2x") })) : (_jsx(FontAwesomeIcon, { icon: icon, size: '2x' })), _jsx("br", {}), _jsx("div", { style: { marginTop: '1rem' }, children: _jsx("strong", { children: title }) })] }));
}
