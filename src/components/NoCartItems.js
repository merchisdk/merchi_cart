import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCartContext } from '../CartProvider';
import pngProductNotFound from '../assets/product-not-found.png';
function NoCartItems() {
    var classNameNoItems = useCartContext().classNameNoItems;
    return (_jsxs("div", { className: classNameNoItems, children: [_jsx("img", { src: pngProductNotFound.src, width: 276, height: 215 }), _jsx("p", { children: "No cart items." })] }));
}
export default NoCartItems;
