import { jsx as _jsx } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
import { tabIdClearCart } from '../slices/sliceCart';
import { setActiveTab } from '../store';
import Button from './Button';
function ButtonClearCart() {
    var classNameBtnCartClear = useCartContext().classNameBtnCartClear;
    return (_jsx(Button, { className: classNameBtnCartClear, onClick: function () { return setActiveTab(tabIdClearCart); }, children: "Clear cart" }));
}
export default ButtonClearCart;
