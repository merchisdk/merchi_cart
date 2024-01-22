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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
var CartContext = createContext({
    classNameAlertError: undefined,
    classNameAlertInfo: undefined,
    classNameAlertSuccess: undefined,
    classNameAlertWarning: undefined,
    classNameBtn: undefined,
    classNameBtnBack: undefined,
    classNameBtnCartClear: undefined,
    classNameBtnClose: undefined,
    classNameBtnDanger: undefined,
    classNameBtnDefault: undefined,
    classNameBtnDownloadInvoice: undefined,
    classNameBtnPrimary: undefined,
    classNameBtnLink: undefined,
    classNameBtnNext: undefined,
    classNameBtnNextComplete: undefined,
    classNameBtnPay: undefined,
    classNameCartBody: undefined,
    classNameCartFooter: undefined,
    classNameCartFormCheckbox: undefined,
    classNameCartFormGroup: undefined,
    classNameCartFormGroupCheckbox: undefined,
    classNameCartFormInput: undefined,
    classNameCartInputError: undefined,
    classNameCartFormLabelCheckbox: undefined,
    classNameCartRow: undefined,
    classNameCartRowColumn: undefined,
    classNameCartTabItem: undefined,
    classNameCartTabItemLink: undefined,
    classNameCartGoogleSuggestList: undefined,
    classNameCartGoogleSuggestListItem: undefined,
    classNameCartHeader: undefined,
    classNameCartItemFeatureImage: undefined,
    classNameCartItemInfo: undefined,
    classNameCartItemInfoCell: undefined,
    classNameCartItemInfoCellRight: undefined,
    classNameCartItemInfoContainer: undefined,
    classNameCartNav: undefined,
    classNameCartTab: undefined,
    classNameCartTabPanel: undefined,
    classNameCartTitle: undefined,
    classNameCartTotalContainer: undefined,
    classNameCartTotalItem: undefined,
    classNameCartTotalItemPrice: undefined,
    classNameClearCartContainer: undefined,
    classNameClearCartText: undefined,
    classNameListClientInfo: undefined,
    classNameListContainer: undefined,
    classNameListItem: undefined,
    classNameList: undefined,
    classNameListInline: undefined,
    classNameListUnstyled: undefined,
    classNameLoadingTemplate: undefined,
    classNameLoadingTemplateContainer: undefined,
    classNameNoItems: undefined,
    classNameShipmentOption: undefined,
    classNameTable: undefined,
    classNameTableContainer: undefined,
    classNameVariationsList: undefined,
    customSuccessMessage: undefined,
    domainId: undefined,
    googlePlacesLoaded: false,
    includeTheme: false,
    initialiseCart: true,
    onClickClose: undefined,
    productFormClassNames: {},
    showUserTermsAndConditions: undefined,
    urlApi: undefined,
    urlFrontend: undefined,
    urlTrackingPage: undefined,
});
export var useCartContext = function () { return useContext(CartContext); };
var CartProvider = function (_a) {
    var children = _a.children, _b = _a.classNameAlertError, classNameAlertError = _b === void 0 ? 'alert alert-error alert-dismissible' : _b, _c = _a.classNameAlertInfo, classNameAlertInfo = _c === void 0 ? 'alert alert-info alert-dismissible' : _c, _d = _a.classNameAlertSuccess, classNameAlertSuccess = _d === void 0 ? 'alert alert-success alert-dismissible' : _d, _e = _a.classNameAlertWarning, classNameAlertWarning = _e === void 0 ? 'alert alert-warning alert-dismissible' : _e, _f = _a.classNameBtn, classNameBtn = _f === void 0 ? 'btn' : _f, _g = _a.classNameBtnBack, classNameBtnBack = _g === void 0 ? 'btn-lg btn-default pull-left' : _g, _h = _a.classNameBtnCartClear, classNameBtnCartClear = _h === void 0 ? 'btn-lg btn-danger mr-auto' : _h, _j = _a.classNameBtnClose, classNameBtnClose = _j === void 0 ? 'btn-close' : _j, _k = _a.classNameBtnDanger, classNameBtnDanger = _k === void 0 ? 'btn btn-md btn-danger' : _k, _l = _a.classNameBtnDefault, classNameBtnDefault = _l === void 0 ? 'btn btn-md btn-default' : _l, _m = _a.classNameBtnDownloadInvoice, classNameBtnDownloadInvoice = _m === void 0 ? 'btn btn-lg btn-primary' : _m, _o = _a.classNameBtnPrimary, classNameBtnPrimary = _o === void 0 ? 'btn btn-md btn-primary' : _o, _p = _a.classNameBtnLink, classNameBtnLink = _p === void 0 ? 'btn-md btn-link' : _p, _q = _a.classNameBtnNext, classNameBtnNext = _q === void 0 ? 'btn-lg btn-primary' : _q, _r = _a.classNameBtnNextComplete, classNameBtnNextComplete = _r === void 0 ? 'btn-lg btn-success' : _r, _s = _a.classNameBtnPay, classNameBtnPay = _s === void 0 ? 'btn-lg btn-primary width-full' : _s, _t = _a.classNameCartBody, classNameCartBody = _t === void 0 ? 'merchi-cart-body' : _t, _u = _a.classNameCartFooter, classNameCartFooter = _u === void 0 ? 'merchi-cart-footer' : _u, // add to sass
    _v = _a.classNameCartFormCheckbox, // add to sass
    classNameCartFormCheckbox = _v === void 0 ? 'form-check-input' : _v, _w = _a.classNameCartFormGroup, classNameCartFormGroup = _w === void 0 ? 'form-group' : _w, _x = _a.classNameCartFormGroupCheckbox, classNameCartFormGroupCheckbox = _x === void 0 ? 'form-check' : _x, _y = _a.classNameCartFormInput, classNameCartFormInput = _y === void 0 ? 'form-control' : _y, _z = _a.classNameCartFormLabelCheckbox, classNameCartFormLabelCheckbox = _z === void 0 ? '' : _z, _0 = _a.classNameCartInputError, classNameCartInputError = _0 === void 0 ? 'text-danger' : _0, _1 = _a.classNameCartNav, classNameCartNav = _1 === void 0 ? 'nav nav-tabs merchi-nav merchi-nav-fill merchi-nav-pills' : _1, _2 = _a.classNameCartRow, classNameCartRow = _2 === void 0 ? 'merchi-row' : _2, _3 = _a.classNameCartRowColumn, classNameCartRowColumn = _3 === void 0 ? 'merchi-column' : _3, _4 = _a.classNameCartTabItem, classNameCartTabItem = _4 === void 0 ? 'nav-item merchi-nav-item' : _4, _5 = _a.classNameCartTabItemLink, classNameCartTabItemLink = _5 === void 0 ? 'nav-link merchi-nav-link' : _5, _6 = _a.classNameCartGoogleSuggestList, classNameCartGoogleSuggestList = _6 === void 0 ? 'list-group m-b-0' : _6, _7 = _a.classNameCartGoogleSuggestListItem, classNameCartGoogleSuggestListItem = _7 === void 0 ? 'list-group-item cursor-pointer' : _7, _8 = _a.classNameCartHeader, classNameCartHeader = _8 === void 0 ? 'merchi-cart-header' : _8, // add to sass
    _9 = _a.classNameCartItemFeatureImage, // add to sass
    classNameCartItemFeatureImage = _9 === void 0 ? 'img-rounded m-10' : _9, _10 = _a.classNameCartItemInfo, classNameCartItemInfo = _10 === void 0 ? 'text-muted font-weight-normal font-italic' : _10, _11 = _a.classNameCartItemInfoCell, classNameCartItemInfoCell = _11 === void 0 ? 'border-0 align-middle' : _11, _12 = _a.classNameCartItemInfoCellRight, classNameCartItemInfoCellRight = _12 === void 0 ? 'border-0 align-middle text-right' : _12, _13 = _a.classNameCartItemInfoContainer, classNameCartItemInfoContainer = _13 === void 0 ? 'ml-3 d-inline-block align-middle' : _13, _14 = _a.classNameCartTab, classNameCartTab = _14 === void 0 ? 'merchi-tab-content' : _14, _15 = _a.classNameCartTabPanel, classNameCartTabPanel = _15 === void 0 ? 'merchi-tab-panel' : _15, _16 = _a.classNameCartTitle, classNameCartTitle = _16 === void 0 ? 'merchi-cart-title' : _16, // add to sass // paddingBottom: '0.5rem', paddingTop: '0.5rem', textAlign: 'center',
    _17 = _a.classNameCartTotalContainer, // add to sass // paddingBottom: '0.5rem', paddingTop: '0.5rem', textAlign: 'center',
    classNameCartTotalContainer = _17 === void 0 ? 'merchi-cart-total-container' : _17, // add to sass
    _18 = _a.classNameCartTotalItem, // add to sass
    classNameCartTotalItem = _18 === void 0 ? 'merchi-cart-total-item' : _18, // add to sass; original text-right cart-cell-width-subtotal
    _19 = _a.classNameCartTotalItemPrice, // add to sass; original text-right cart-cell-width-subtotal
    classNameCartTotalItemPrice = _19 === void 0 ? 'merchi-cart-total-item-price' : _19, // add to sass: original text-right
    _20 = _a.classNameClearCartContainer, // add to sass: original text-right
    classNameClearCartContainer = _20 === void 0 ? 'merchi-cart-clear-container' : _20, _21 = _a.classNameClearCartText, classNameClearCartText = _21 === void 0 ? 'merchi-cart-clear-text' : _21, _22 = _a.classNameListClientInfo, classNameListClientInfo = _22 === void 0 ? 'merchi-cart-client-info-list' : _22, // add to sass: original className='list-unstyled text-center' fontSize: '15px', listStyle: 'none', paddingBottom: '0px', paddingLeft: '0px'
    _23 = _a.classNameList, // add to sass: original className='list-unstyled text-center' fontSize: '15px', listStyle: 'none', paddingBottom: '0px', paddingLeft: '0px'
    classNameList = _23 === void 0 ? 'list-group' : _23, _24 = _a.classNameListInline, classNameListInline = _24 === void 0 ? 'list-inline' : _24, _25 = _a.classNameListUnstyled, classNameListUnstyled = _25 === void 0 ? 'list-unstyled' : _25, _26 = _a.classNameListContainer, classNameListContainer = _26 === void 0 ? 'pb-2' : _26, _27 = _a.classNameListItem, classNameListItem = _27 === void 0 ? 'list-group-item' : _27, _28 = _a.classNameLoadingTemplate, classNameLoadingTemplate = _28 === void 0 ? 'merchi-loading-template' : _28, _29 = _a.classNameLoadingTemplateContainer, classNameLoadingTemplateContainer = _29 === void 0 ? 'merchi-loading-template-container' : _29, _30 = _a.classNameNoItems, classNameNoItems = _30 === void 0 ? 'merchi-no-cart-items' : _30, _31 = _a.classNameShipmentOption, classNameShipmentOption = _31 === void 0 ? 'merchi-shipment-option' : _31, _32 = _a.classNameTable, classNameTable = _32 === void 0 ? 'table table-bordered' : _32, _33 = _a.classNameTableContainer, classNameTableContainer = _33 === void 0 ? 'table-responsive' : _33, _34 = _a.classNameVariationsList, classNameVariationsList = _34 === void 0 ? 'list-unstyled list-inline' : _34, customSuccessMessage = _a.customSuccessMessage, domainId = _a.domainId, _35 = _a.includeTheme, includeTheme = _35 === void 0 ? false : _35, _36 = _a.initialiseCart, initialiseCart = _36 === void 0 ? true : _36, _37 = _a.onClickClose, onClickClose = _37 === void 0 ? function () { return console.log('close merchi cart!'); } : _37, _38 = _a.productFormClassNames, productFormClassNames = _38 === void 0 ? {} : _38, _39 = _a.showUserTermsAndConditions, showUserTermsAndConditions = _39 === void 0 ? true : _39, _40 = _a.urlApi, urlApi = _40 === void 0 ? 'https://api.merchi.co/v6/' : _40, _41 = _a.urlFrontend, urlFrontend = _41 === void 0 ? 'https://merchi.co/' : _41, urlTrackingPage = _a.urlTrackingPage;
    var _42 = __read(useState(false), 2), googlePlacesLoaded = _42[0], setGoogleMapsLoaded = _42[1];
    // Persistent callback setup
    if (typeof window !== 'undefined') {
        if (!window.googleMapsScriptLoaded) {
            window.googleMapsScriptLoaded = function () {
                setGoogleMapsLoaded(true);
            };
        }
    }
    return (_jsx(CartContext.Provider, { value: {
            classNameAlertError: classNameAlertError,
            classNameAlertInfo: classNameAlertInfo,
            classNameAlertSuccess: classNameAlertSuccess,
            classNameAlertWarning: classNameAlertWarning,
            classNameBtn: classNameBtn,
            classNameBtnBack: classNameBtnBack,
            classNameBtnCartClear: classNameBtnCartClear,
            classNameBtnClose: classNameBtnClose,
            classNameBtnDanger: classNameBtnDanger,
            classNameBtnDefault: classNameBtnDefault,
            classNameBtnDownloadInvoice: classNameBtnDownloadInvoice,
            classNameBtnPrimary: classNameBtnPrimary,
            classNameBtnLink: classNameBtnLink,
            classNameBtnNext: classNameBtnNext,
            classNameBtnNextComplete: classNameBtnNextComplete,
            classNameBtnPay: classNameBtnPay,
            classNameCartBody: classNameCartBody,
            classNameCartFooter: classNameCartFooter,
            classNameCartFormCheckbox: classNameCartFormCheckbox,
            classNameCartFormGroup: classNameCartFormGroup,
            classNameCartFormGroupCheckbox: classNameCartFormGroupCheckbox,
            classNameCartFormInput: classNameCartFormInput,
            classNameCartFormLabelCheckbox: classNameCartFormLabelCheckbox,
            classNameCartInputError: classNameCartInputError,
            classNameCartNav: classNameCartNav,
            classNameCartRow: classNameCartRow,
            classNameCartRowColumn: classNameCartRowColumn,
            classNameCartTabItem: classNameCartTabItem,
            classNameCartTabItemLink: classNameCartTabItemLink,
            classNameCartGoogleSuggestList: classNameCartGoogleSuggestList,
            classNameCartGoogleSuggestListItem: classNameCartGoogleSuggestListItem,
            classNameCartHeader: classNameCartHeader,
            classNameCartItemFeatureImage: classNameCartItemFeatureImage,
            classNameCartItemInfo: classNameCartItemInfo,
            classNameCartItemInfoCell: classNameCartItemInfoCell,
            classNameCartItemInfoCellRight: classNameCartItemInfoCellRight,
            classNameCartItemInfoContainer: classNameCartItemInfoContainer,
            classNameCartTab: classNameCartTab,
            classNameCartTabPanel: classNameCartTabPanel,
            classNameCartTitle: classNameCartTitle,
            classNameCartTotalContainer: classNameCartTotalContainer,
            classNameCartTotalItem: classNameCartTotalItem,
            classNameCartTotalItemPrice: classNameCartTotalItemPrice,
            classNameClearCartContainer: classNameClearCartContainer,
            classNameClearCartText: classNameClearCartText,
            classNameListClientInfo: classNameListClientInfo,
            classNameList: classNameList,
            classNameListInline: classNameListInline,
            classNameListContainer: classNameListContainer,
            classNameListItem: classNameListItem,
            classNameListUnstyled: classNameListUnstyled,
            classNameLoadingTemplate: classNameLoadingTemplate,
            classNameLoadingTemplateContainer: classNameLoadingTemplateContainer,
            classNameNoItems: classNameNoItems,
            classNameShipmentOption: classNameShipmentOption,
            classNameTable: classNameTable,
            classNameTableContainer: classNameTableContainer,
            classNameVariationsList: classNameVariationsList,
            customSuccessMessage: customSuccessMessage,
            domainId: domainId,
            googlePlacesLoaded: googlePlacesLoaded,
            includeTheme: includeTheme,
            initialiseCart: initialiseCart,
            onClickClose: onClickClose,
            productFormClassNames: productFormClassNames,
            showUserTermsAndConditions: showUserTermsAndConditions,
            urlApi: urlApi,
            urlFrontend: urlFrontend,
            urlTrackingPage: urlTrackingPage,
        }, children: children }));
};
export default CartProvider;
