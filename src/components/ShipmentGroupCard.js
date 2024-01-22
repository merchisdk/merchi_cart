import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { setSelectedShipmentQuote } from '../store';
import { addressInOneLine } from '../utilities/address';
import { currencyTaxAndCost } from '../utilities/currency';
import { useCartContext } from '../CartProvider';
import pngProductNotFound from '../assets/product-not-found.png';
function NoCartShipmentOptionsFound() {
    var classNameNoItems = useCartContext().classNameNoItems;
    return (_jsxs("div", { className: classNameNoItems, children: [_jsx("img", { src: pngProductNotFound.src, width: 276, height: 215 }), _jsx("p", { children: "No cart items." })] }));
}
function PickupInfo(_a) {
    var originAddress = _a.originAddress;
    return (_jsxs("small", { children: ["Pick up from: ", addressInOneLine(originAddress)] }));
}
function ShipmentPrice(_a) {
    var quote = _a.quote;
    var shipmentMethod = quote.shipmentMethod, taxType = quote.taxType, totalCost = quote.totalCost;
    var currency = shipmentMethod.currency;
    return (_jsx("div", { children: _jsx("small", { children: _jsx("strong", { children: totalCost > 0 ? currencyTaxAndCost(currency, taxType, totalCost) : '' }) }) }));
}
function ShipmentOptionInfo(_a) {
    var quote = _a.quote;
    var classNameShipmentOption = useCartContext().classNameShipmentOption;
    var name = quote.name, shipmentMethod = quote.shipmentMethod;
    var originAddress = shipmentMethod.originAddress, pickUp = shipmentMethod.pickUp, transportCompanyName = shipmentMethod.transportCompanyName;
    return (_jsxs("div", { className: classNameShipmentOption, children: [!name ?
                _jsxs(_Fragment, { children: [transportCompanyName &&
                            _jsx("p", { className: 'mb-0', children: shipmentMethod.name }), pickUp ?
                            _jsx(PickupInfo, { originAddress: originAddress })
                            :
                                _jsx("small", { children: transportCompanyName })] })
                :
                    _jsxs(_Fragment, { children: [_jsx("p", { className: 'm-0', children: name }), pickUp && _jsx(PickupInfo, { originAddress: originAddress })] }), _jsx(ShipmentPrice, { quote: quote })] }));
}
function ShipmentQuote(_a) {
    var groupIndex = _a.groupIndex, quote = _a.quote;
    var classNameListItem = useCartContext().classNameListItem;
    var selectedQuotes = useSelector(function (s) { return s.stateCartShipment; }).selectedQuotes;
    var isSelected = selectedQuotes[groupIndex].id === quote.id;
    function doClick() {
        setSelectedShipmentQuote(groupIndex, quote);
    }
    var icon = isSelected ? 'far fa-check-square' : 'far fa-square';
    return (_jsx("div", { className: classNameListItem, onClick: doClick, style: { cursor: 'pointer' }, children: _jsxs("div", { style: {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
            }, children: [_jsx(ShipmentOptionInfo, { quote: quote }), _jsx("div", { children: _jsx("i", { className: icon }) })] }) }));
}
function ShipmentGroupCard(_a) {
    var group = _a.group, groupIndex = _a.groupIndex;
    var _b = useCartContext(), classNameList = _b.classNameList, classNameListInline = _b.classNameListInline;
    var cartItems = group.cartItems, _c = group.quotes, quotes = _c === void 0 ? [] : _c;
    return (_jsxs("div", { children: [_jsxs("ul", { className: classNameListInline, children: [_jsx("li", { children: _jsxs("strong", { children: ["Shipment ", groupIndex + 1, " contents:"] }) }), cartItems.map(function (item, index) {
                        return _jsx("li", { children: item.product.name }, index);
                    })] }), quotes.length ? (_jsx("div", { className: classNameList, children: quotes.map(function (q, i) {
                    return _jsx(ShipmentQuote, { quote: q, groupIndex: groupIndex }, "".concat(i, "-group"));
                }) })) : (_jsx(NoCartShipmentOptionsFound, {}))] }));
}
export default ShipmentGroupCard;
