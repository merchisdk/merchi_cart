import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { tabIdCheckout, tabIdItems, tabIdPaymentSuccess, tabIdShipment, } from '../slices/sliceCart';
import ButtonNext from './ButtonNext';
import ButtonShipmentTabNext from './ButtonShipmentTabNext';
function ButtonNextDynamic() {
    var _a = useSelector(function (s) { return s.stateCart; }), cart = _a.cart, activeTab = _a.activeTab;
    var cartItems = cart.cartItems;
    var hasCartItems = cartItems && cartItems.length;
    var isCartItemsTabActive = activeTab === tabIdItems;
    var isShipmentTabActive = activeTab === tabIdShipment;
    var isCheckoutTabOpen = activeTab === tabIdCheckout;
    var isPaymentSuccessOpen = activeTab === tabIdPaymentSuccess;
    return isCheckoutTabOpen || isPaymentSuccessOpen ? (_jsx(_Fragment, {})) : isShipmentTabActive ? (_jsx(ButtonShipmentTabNext, {})) : isCartItemsTabActive && !hasCartItems ? (_jsx(_Fragment, {})) : (_jsx(ButtonNext, {}));
}
export default ButtonNextDynamic;
