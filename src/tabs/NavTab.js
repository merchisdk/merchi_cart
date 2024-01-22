import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { sliceCart } from '../slices/sliceCart';
import { useCartContext } from '../CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function NavTab(_a) {
    var disabled = _a.disabled, icon = _a.icon, name = _a.name, tabId = _a.tabId;
    var dispatch = useDispatch();
    var _b = useCartContext(), classNameCartTabItem = _b.classNameCartTabItem, classNameCartTabItemLink = _b.classNameCartTabItemLink;
    var activeTab = useSelector(function (s) { return s.stateCart; }).activeTab;
    function toggle() {
        dispatch(sliceCart.actions.setActiveTab(tabId));
    }
    var active = activeTab === tabId;
    return (_jsx("div", { className: classNameCartTabItem, children: _jsxs("button", { className: "".concat(classNameCartTabItemLink, " ").concat(active ? 'active' : '', " disClass"), onClick: toggle, disabled: disabled, children: [_jsx(FontAwesomeIcon, { icon: icon }), " ", name] }) }));
}
export default NavTab;
