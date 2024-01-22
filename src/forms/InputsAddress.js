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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Geosuggest from 'react-geosuggest';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Controller } from 'react-hook-form';
import InputText from './InputText';
import { addressInOneLine, geoSuggestResultAsNewAddress } from '../utilities/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Collapse } from '../components';
import { useCartContext } from '../CartProvider';
export function InputsAddress(_a) {
    var _b = _a.defaultAddress, defaultAddress = _b === void 0 ? {} : _b, _c = _a.labelGeoSuggest, labelGeoSuggest = _c === void 0 ? 'Address' : _c, hookForm = _a.hookForm, name = _a.name, _d = _a.placeholder, placeholder = _d === void 0 ? 'Search your address' : _d, updateAddress = _a.updateAddress;
    var geosuggestEl = useRef(null);
    var _e = useCartContext(), googlePlacesLoaded = _e.googlePlacesLoaded, classNameCartFormGroup = _e.classNameCartFormGroup, classNameCartFormInput = _e.classNameCartFormInput, classNameCartRow = _e.classNameCartRow, classNameCartRowColumn = _e.classNameCartRowColumn, classNameCartGoogleSuggestList = _e.classNameCartGoogleSuggestList, classNameCartGoogleSuggestListItem = _e.classNameCartGoogleSuggestListItem;
    var control = hookForm.control, _f = hookForm.formState, errors = _f.errors, isValid = _f.isValid, submitCount = _f.submitCount, setValue = hookForm.setValue, getValues = hookForm.getValues;
    var inputName = function (_name) { return "".concat(name ? "".concat(name, ".") : '').concat(_name); };
    function onSuggestSelect(suggest) {
        if (suggest) {
            updateAddress(geoSuggestResultAsNewAddress(suggest));
        }
        else {
            updateAddress({
                city: '',
                country: '',
                lineOne: '',
                lineTwo: '',
                postcode: '',
                state: '',
            });
        }
        geosuggestEl.current.blur();
    }
    function onChangeCountryState() {
        var addr = getValues();
        updateAddress(addr[name]);
    }
    var _g = __read(useState(false), 2), addressFieldsOpen = _g[0], setAddressFieldsOpen = _g[1];
    var toggleAddressFieldsOpen = function () { return setAddressFieldsOpen(!addressFieldsOpen); };
    useEffect(function () {
        if (!isValid && !addressFieldsOpen && submitCount > 0) {
            toggleAddressFieldsOpen();
        }
    }, [isValid, submitCount]);
    var addressForm = (_jsxs(_Fragment, { children: [_jsx(InputText, { control: control, label: "Address line one", name: inputName("lineOne"), placeholder: "123 Fake st", rules: { required: 'Address line one is required.' } }), _jsx(InputText, { control: control, label: "Continue address", name: inputName("lineTwo"), placeholder: "Continue address..." }), _jsxs("div", { className: classNameCartRow, children: [_jsx("div", { className: classNameCartRowColumn, children: _jsx(InputText, { control: control, label: "City / Province", name: inputName("city"), placeholder: "City", rules: { required: 'City / Province is required.' } }) }), _jsx("div", { className: classNameCartRowColumn, children: _jsx(InputText, { control: control, label: "Post / Zip code", name: inputName("postcode"), placeholder: "90210" }) })] }), _jsxs("div", { className: classNameCartRow, children: [_jsx("div", { className: classNameCartRowColumn, children: _jsxs("div", { className: classNameCartFormGroup, children: [_jsx("label", { children: "Country" }), _jsx(Controller, { name: inputName("country"), control: control, defaultValue: defaultAddress && defaultAddress.country, render: function (_a) {
                                        var field = _a.field;
                                        return (_jsx(CountryDropdown, __assign({}, field, { 
                                            // value={defaultAddress && defaultAddress.country}
                                            classes: classNameCartFormInput, onChange: function (val) {
                                                setValue(inputName("country"), val);
                                                field.onChange(val);
                                                onChangeCountryState();
                                            }, valueType: 'short' })));
                                    } })] }) }), _jsx("div", { className: classNameCartRowColumn, children: _jsxs("div", { className: classNameCartFormGroup, children: [_jsx("label", { children: "State / Region" }), _jsx(Controller, { name: inputName("state"), control: control, defaultValue: defaultAddress && defaultAddress.state, render: function (_a) {
                                        var field = _a.field;
                                        return (_jsx(RegionDropdown, __assign({}, field, { 
                                            // value={defaultAddress && defaultAddress.state}
                                            countryValueType: "short", country: getValues(inputName("country")), classes: classNameCartFormInput, onChange: function (val) {
                                                setValue(inputName("state"), val);
                                                field.onChange(val);
                                                onChangeCountryState();
                                            }, valueType: 'short' })));
                                    } })] }) })] })] }));
    return (_jsx(_Fragment, { children: googlePlacesLoaded
            ? _jsxs(_Fragment, { children: [_jsxs("div", { className: classNameCartFormGroup, children: [_jsx("label", { children: labelGeoSuggest }), _jsx(Geosuggest, { ref: geosuggestEl, style: { input: { '::placeholder': { color: '#525f7f' } } }, initialValue: addressInOneLine(defaultAddress), inputClassName: classNameCartFormInput, onSuggestSelect: onSuggestSelect, placeholder: placeholder, suggestsClassName: classNameCartGoogleSuggestList, suggestItemClassName: classNameCartGoogleSuggestListItem, types: ['establishment', 'geocode'] })] }), _jsx(Collapse, { isOpen: addressFieldsOpen, children: addressForm }), _jsxs("div", { className: 'd-flex align-items-center', children: [!!errors.length &&
                                _jsxs("div", { className: 'text-danger', children: [_jsx(FontAwesomeIcon, { icon: faExclamationTriangle }), " Invalid address!"] }), _jsxs("a", { className: "ml-auto btn btn-sm btn-link ".concat(!!errors.length && 'text-danger'), onClick: toggleAddressFieldsOpen, children: [_jsx(FontAwesomeIcon, { icon: addressFieldsOpen ? faTimes : faEdit }), " ", addressFieldsOpen ? 'Close' : 'Edit fields'] })] })] })
            : addressForm }));
}
export default InputsAddress;
