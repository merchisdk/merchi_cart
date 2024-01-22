var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputsAddress from './InputsAddress';
import { CheckoutContainer, InnerContainer, } from '../components/containers';
import { Title } from '../components';
import { updateCartShipmentAddress, saveCartShipmentAddressAndGoToNextTab, } from '../store';
import { shipmentFormId, sliceCartShipment } from '../slices/sliceCartShipment';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../CartProvider';
var AddressGeoSuggestInput = function (props) { return (_jsx(InputsAddress, __assign({}, props, { name: 'receiverAddress' }))); };
function FormShipmentAddressAndNotes(_a) {
    var _b = _a.address, address = _b === void 0 ? {} : _b, formId = _a.formId, _c = _a.notes, notes = _c === void 0 ? '' : _c, _d = _a.showIcon, showIcon = _d === void 0 ? true : _d, _e = _a.deliveryNomenclature, deliveryNomenclature = _e === void 0 ? false : _e, _f = _a.showHeadings, showHeadings = _f === void 0 ? true : _f, setCartShipmentAddress = _a.setCartShipmentAddress, updateCartShipmentAddress = _a.updateCartShipmentAddress;
    var classNameCartFormGroup = useCartContext().classNameCartFormGroup;
    var hookForm = useForm({
        defaultValues: {
            receiverAddress: address,
            receiverNotes: notes,
        },
    });
    var getValues = hookForm.getValues, handleSubmit = hookForm.handleSubmit, register = hookForm.register, reset = hookForm.reset;
    function onSubmit() {
        setCartShipmentAddress(getValues());
    }
    function updateAddress(addr) {
        var oldAddresses = getValues();
        var newAddress = addr ? __assign({}, addr) : {};
        oldAddresses['receiverAddress'] = newAddress;
        reset(oldAddresses);
        updateCartShipmentAddress(newAddress);
    }
    return (_jsxs("form", { id: formId, onSubmit: handleSubmit(onSubmit), children: [showHeadings &&
                _jsx(CheckoutContainer, { children: _jsx(InnerContainer, { paddingBottom: '1rem', children: _jsx(Title, { icon: showIcon ? faMapMarkerAlt : null, Title: 'Delivery / billing address' }) }) }), _jsx(AddressGeoSuggestInput, { defaultAddress: address, hookForm: hookForm, labelGeoSuggest: "Enter your ".concat(deliveryNomenclature ? 'delivery' : 'shipping', " address"), name: 'receiverAddress', updateAddress: updateAddress }), _jsxs("div", { className: classNameCartFormGroup, children: [_jsxs("label", { children: [deliveryNomenclature ? 'Delivery' : 'Shipment', " notes"] }), _jsx("textarea", { className: 'form-control input', defaultValue: notes, name: 'receiverNotes', placeholder: 'Example - Leave at top of stairs', rows: 4, ref: register })] })] }));
}
export function ActiveFormShipmentAddressAndNotes() {
    var dispatch = useDispatch();
    var _a = useSelector(function (s) { return s.stateCartShipment; }), addressFieldsOpen = _a.addressFieldsOpen, receiverAddress = _a.receiverAddress, receiverNotes = _a.receiverNotes;
    function toggleAddressFieldsOpen() {
        dispatch(sliceCartShipment.actions.toggleAddressFields());
    }
    function actionUpdateCartShipmentAddress(address) {
        dispatch(sliceCartShipment.actions.
            updateShipmentAddress(address));
        updateCartShipmentAddress();
    }
    return (_jsx(FormShipmentAddressAndNotes, { address: receiverAddress, addressFieldsOpen: addressFieldsOpen, formId: shipmentFormId, notes: receiverNotes, setCartShipmentAddress: saveCartShipmentAddressAndGoToNextTab, toggleAddressFields: toggleAddressFieldsOpen, updateCartShipmentAddress: actionUpdateCartShipmentAddress }));
}
export default FormShipmentAddressAndNotes;
