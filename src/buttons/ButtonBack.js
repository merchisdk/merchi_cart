import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useCartContext } from '../CartProvider';
import { setActiveTab } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
function ButtonBack(_a) {
    var text = _a.text;
    var _b = useCartContext(), classNameBtnBack = _b.classNameBtnBack, onClickClose = _b.onClickClose;
    var _c = useSelector(function (s) { return s.stateCart; }), activeTab = _c.activeTab, tabs = _c.tabs;
    var currentTabIndex = tabs.findIndex(function (t) { return t.tabId === activeTab; });
    var nextTab = null;
    if (currentTabIndex > 0) {
        nextTab = tabs[currentTabIndex - 1];
    }
    var nextTabId = nextTab ? nextTab.tabId : 0;
    return (_jsxs(Button, { className: classNameBtnBack, onClick: activeTab === 0 ?
            onClickClose
            :
                function () { return setActiveTab(nextTabId); }, children: [_jsx(FontAwesomeIcon, { icon: faArrowLeft }), text ? " ".concat(text) : ''] }));
}
export default ButtonBack;
