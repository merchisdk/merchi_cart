import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ActiveFormShipmentAddressAndNotes } from '../forms/FormShipmentAddressAndNotes';
import { CheckoutContainer, InnerContainer, } from '../components/containers';
import { Alert, CartBody, CartTabPanel, LoadingTemplateSm, ShipmentGroupCard, Title, } from '../components';
import { tabIdShipment } from '../slices/sliceCart';
import CartNav from '../tabs/CartNav';
function PanelCartShipment() {
    var _a = useSelector(function (s) { return s; }).stateCartShipment, fetchingShipmentGroups = _a.fetchingShipmentGroups, shipmentGroups = _a.shipmentGroups;
    return (_jsxs(CartTabPanel, { tabId: tabIdShipment, children: [_jsx(CartNav, {}), _jsx(CartBody, { style: { paddingTop: '2rem' }, children: _jsxs("div", { className: 'merchi-cart-tab-content', children: [_jsx(CheckoutContainer, { textAlign: 'left', children: _jsx(InnerContainer, { width: 700, paddingBottom: '3rem', children: _jsx(ActiveFormShipmentAddressAndNotes, {}) }) }), fetchingShipmentGroups ? (_jsx(CheckoutContainer, { children: _jsxs(InnerContainer, { width: 700, children: [_jsx(LoadingTemplateSm, {}), _jsx("p", { children: "Fetching shipping options." })] }) })) : (_jsxs(_Fragment, { children: [_jsx(CheckoutContainer, { textAlign: 'left', children: _jsx(InnerContainer, { paddingBottom: '1rem', width: 700, children: _jsx(Title, { icon: faTruck, title: shipmentGroups.length > 1 ?
                                                'Select shipment methods'
                                                : shipmentGroups.length ?
                                                    'Select a shipment method'
                                                    : '' }) }) }), _jsx(CheckoutContainer, { textAlign: 'left', children: _jsxs(InnerContainer, { paddingBottom: '1rem', width: 700, children: [shipmentGroups.length > 1 &&
                                                _jsx(Alert, { alertType: 'warning', children: "Items within this cart are warehoused in different locations and will be shipped separately. Please select how you would like your items to be shipped." }), shipmentGroups.map(function (group, index) {
                                                return _jsx(ShipmentGroupCard, { group: group, groupIndex: index }, "".concat(index, "-shipment-group"));
                                            })] }) })] }))] }) })] }));
}
export default PanelCartShipment;
