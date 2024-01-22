import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { tabIdCheckout } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';
function ButtonNext() {
    var _a = useCartContext(), classNameBtnNext = _a.classNameBtnNext, classNameBtnNextComplete = _a.classNameBtnNextComplete;
    var _b = useSelector(function (s) { return s.stateCart; }), activeTab = _b.activeTab, loading = _b.loading, tabs = _b.tabs;
    var currentTabIndex = tabs.findIndex(function (t) { return t.tabId === activeTab; });
    var nextTab = tabs[currentTabIndex + 1];
    var isCheckoutTabOpen = activeTab === tabIdCheckout;
    var icon = loading ? faCircleNotch : isCheckoutTabOpen ? faCreditCard : faArrowRight;
    return (_jsxs(Button, { className: isCheckoutTabOpen ? classNameBtnNextComplete : classNameBtnNext, onClick: nextTab ? function () { return setActiveTab(nextTab.tabId); } : undefined, disabled: loading, children: [_jsx(FontAwesomeIcon, { icon: icon, spin: loading }), _jsx("span", { style: { marginLeft: '5px' }, children: loading ? 'Loading...' : 'Next' })] }));
}
export default ButtonNext;
