import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cartItemCurrencyAndCost } from '../utilities/currency';
import { productFeatureImageUrl } from '../utilities/product';
import { valueString } from '../utilities/variations';
import { actionDeleteCartItem, setCartItem } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../buttons';
import { useCartContext } from '../CartProvider';
function VariationListItem(props) {
    var variation = props.variation;
    var field = variation.variationField;
    return (_jsx("li", { children: "".concat(field.name, ": ").concat(valueString(variation)) }));
}
function VariationList(_a) {
    var variations = _a.variations;
    var classNameVariationsList = useCartContext().classNameVariationsList;
    return (_jsx("ul", { className: classNameVariationsList, children: variations.map(function (v, index) {
            return _jsx(VariationListItem, { variation: v }, "".concat(index, "-variation"));
        }) }));
}
function GroupVariationItems(props) {
    var count = props.count, group = props.group;
    return (_jsxs("li", { children: ["Group ", count, " Quantity: ", group.quantity, _jsx(VariationList, { variations: group.variations })] }));
}
function VariationsGroupsList(_a) {
    var groups = _a.groups;
    var classNameVariationsList = useCartContext().classNameVariationsList;
    return (_jsx("ul", { className: classNameVariationsList, children: groups.map(function (group, index) {
            return _jsx(GroupVariationItems, { group: group, count: index + 1 }, "".concat(index, "-group-variations"));
        }) }));
}
function CartItemRow(_a) {
    var cartItem = _a.cartItem, index = _a.index, loading = _a.loading;
    var _b = useCartContext(), classNameBtnLink = _b.classNameBtnLink, classNameCartItemFeatureImage = _b.classNameCartItemFeatureImage, classNameCartItemInfo = _b.classNameCartItemInfo, classNameCartItemInfoCell = _b.classNameCartItemInfoCell, classNameCartItemInfoCellRight = _b.classNameCartItemInfoCellRight, classNameCartItemInfoContainer = _b.classNameCartItemInfoContainer;
    var product = cartItem.product, quantity = cartItem.quantity, variations = cartItem.variations, variationsGroups = cartItem.variationsGroups;
    var name = product.name;
    return (_jsxs("tr", { children: [_jsxs("th", { scope: 'row', className: classNameCartItemInfoCell, children: [_jsx("img", { src: productFeatureImageUrl(product), alt: name, width: '70', className: classNameCartItemFeatureImage }), _jsxs("div", { className: classNameCartItemInfoContainer, children: [_jsxs("div", { className: classNameCartItemInfo, children: [_jsx("h5", { style: { display: 'inline' }, children: name }), variations && _jsx(VariationList, { variations: variations })] }), _jsx("div", { className: classNameCartItemInfo, children: variationsGroups && _jsx(VariationsGroupsList, { groups: variationsGroups }) })] })] }), _jsx("td", { className: classNameCartItemInfoCellRight, children: _jsx("strong", { children: quantity }) }), _jsx("td", { className: classNameCartItemInfoCellRight, children: _jsx("strong", { children: cartItemCurrencyAndCost(cartItem) }) }), _jsxs("td", { className: classNameCartItemInfoCellRight, children: [_jsx(Button, { className: classNameBtnLink, onClick: function () { return setCartItem(cartItem, index); }, children: _jsx(FontAwesomeIcon, { icon: faEdit }) }), _jsx(Button, { className: classNameBtnLink, onClick: function () { return actionDeleteCartItem(index); }, children: _jsx(FontAwesomeIcon, { icon: loading ? faCircleNotch : faTrashAlt, spin: loading }) })] })] }));
}
export default CartItemRow;
