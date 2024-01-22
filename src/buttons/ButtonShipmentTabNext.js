import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { shipmentFormId } from '../slices/sliceCartShipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';
export default function ButtonShipmentTabNext() {
    var classNameBtnNext = useCartContext().classNameBtnNext;
    var savingShipmentAddress = useSelector(function (s) { return s.stateCartShipment; }).savingShipmentAddress;
    var icon = savingShipmentAddress ? faCircleNotch : faArrowRight;
    return (_jsxs(Button, { className: classNameBtnNext, form: shipmentFormId, disabled: savingShipmentAddress, children: [_jsx(FontAwesomeIcon, { icon: icon, spin: savingShipmentAddress }), _jsx("span", { style: { marginLeft: '5px' }, children: savingShipmentAddress ? 'Loading...' : 'Next' })] }));
}
