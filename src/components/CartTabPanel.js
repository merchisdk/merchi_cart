import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
export default function CartTabPanel(_a) {
    var children = _a.children, tabId = _a.tabId;
    var _b = useSelector(function (s) { return s; }).stateCart, activeTab = _b.activeTab, tabs = _b.tabs;
    var classNameCartTabPanel = useCartContext().classNameCartTabPanel;
    var activeTabValues = tabs[activeTab];
    var display = tabId === activeTabValues.tabId ? 'block' : 'none';
    return (_jsx("div", { className: classNameCartTabPanel, style: { display: display }, children: children }));
}
