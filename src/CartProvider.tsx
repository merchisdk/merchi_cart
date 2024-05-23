import * as React from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface PropsCart {
  classNameAlertError?: string;
  classNameAlertInfo?: string;
  classNameAlertSuccess?: string;
  classNameAlertWarning?: string;
  classNameBtn?: string;
  classNameBtnBack?: string;
  classNameBtnCartClear?: string;
  classNameBtnClose?: string;
  classNameBtnDanger?: string;
  classNameBtnDefault?: string;
  classNameBtnDownloadInvoice?: string;
  classNameBtnEditCartItem?: string;
  classNameBtnPrimary?: string;
  classNameBtnLink?: string;
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnPay?: string;
  classNameCartBody?: string;
  classNameCartFooter?: string;

  classNameCartFormCheckbox?: string;
  classNameCartFormGroup?: string;
  classNameCartFormGroupButton?: string;
  classNameCartFormGroupCheckbox?: string;
  classNameCartFormInput?: string;
  classNameCartFormLabelCheckbox?: string;
  classNameCartInputError?: string;
  classNameCartNav?: string;
  classNameCartRow?: string;
  classNameCartRowColumn?: string;
  classNameCartTabItem?: string;
  classNameCartTabItemLink?: string;
  classNameCartGoogleSuggestList?: string;
  classNameCartGoogleSuggestListItem?: string;

  classNameCartHeader?: string;
  classNameCartItemFeatureImage?: string;
  classNameCartItemInfo?: string;
  classNameCartItemInfoCell?: string;
  classNameCartItemInfoCellRight?: string;
  classNameCartItemInfoContainer?: string;
  classNameCartTab?: string;
  classNameCartTabPanel?: string;
  classNameCartTitle?: string;
  classNameCartTotalContainer?: string;
  classNameCartTotalItem?: string;
  classNameCartTotalItemPrice?: string;
  classNameClearCartContainer?: string;
  classNameClearCartText?: string;
  classNameCartToggleIconButton?: string;
  classNameListClientInfo?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
  classNameList?: string;
  classNameListInline?: string;
  classNameListUnstyled?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  classNameNoItems?: string;
  classNameShipmentOption?: string;
  classNameTable?: string;
  classNameTableContainer?: string;
  classNameVariationsList?: string;
  customSuccessMessage?: string;
  domainId?: number;
  googlePlacesLoaded?: boolean;
  hideHead?: boolean;
  includeTheme?: boolean,
  initialiseCart?: boolean;
  onClickClose?: () => void;
  showUserTermsAndConditions?: boolean;
  productFormClassNames?: any;
  apiUrl?: string;
  urlFrontend?: string;
  urlTrackingPage?: string;
}

const CartContext = createContext<PropsCart>({
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
  classNameBtnEditCartItem: undefined,
  classNameBtnPrimary: undefined,
  classNameBtnLink: undefined,
  classNameBtnNext: undefined,
  classNameBtnNextComplete: undefined,
  classNameBtnPay: undefined,
  classNameCartBody: undefined,
  classNameCartFooter: undefined,
  classNameCartFormCheckbox: undefined,
  classNameCartFormGroup: undefined,
  classNameCartFormGroupButton: undefined,
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
  classNameCartToggleIconButton: undefined,
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
  hideHead: false,
  includeTheme: false,
  initialiseCart: true,
  onClickClose: undefined,
  productFormClassNames: {},
  showUserTermsAndConditions: undefined,
  apiUrl: undefined,
  urlFrontend: undefined,
  urlTrackingPage: undefined,
});

export const useCartContext = () => useContext(CartContext);

interface PropsCartProvider {
  children: ReactNode;
  classNameAlertError?: string;
  classNameAlertInfo?: string;
  classNameAlertSuccess?: string;
  classNameAlertWarning?: string;
  classNameBtn?: string;
  classNameBtnBack?: string;
  classNameBtnCartClear?: string;
  classNameBtnClose?: string;
  classNameBtnDanger?: string;
  classNameBtnDefault?: string;
  classNameBtnDownloadInvoice?: string;
  classNameBtnEditCartItem?: string;
  classNameBtnPrimary?: string;
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnLink?: string;
  classNameBtnPay?: string;
  classNameCartBody?: string;
  classNameCartFooter?: string;
  classNameCartFormCheckbox?: string;
  classNameCartFormGroup?: string;
  classNameCartFormGroupButton?: string;
  classNameCartFormGroupCheckbox?: string;
  classNameCartFormInput?: string;
  classNameCartFormLabelCheckbox?: string;
  classNameCartInputError?: string;
  classNameCartRow?: string;
  classNameCartRowColumn?: string;
  classNameCartTabItem?: string;
  classNameCartTabItemLink?: string;
  classNameCartGoogleSuggestList?: string;
  classNameCartGoogleSuggestListItem?: string;
  classNameCartHeader?: string;
  classNameCartItemFeatureImage?: string;
  classNameCartItemInfo?: string;
  classNameCartItemInfoCell?: string;
  classNameCartItemInfoCellRight?: string;
  classNameCartNav?: string;
  classNameCartTab?: string;
  classNameCartTabPanel?: string;
  classNameCartTitle?: string;
  classNameCartTotalContainer?: string;
  classNameCartTotalItem?: string;
  classNameCartTotalItemPrice?: string;
  classNameCartToggleIconButton?: string;
  classNameClearCartContainer?: string;
  classNameClearCartText?: string;
  classNameListClientInfo?: string;
  classNameCartItemInfoContainer?: string;
  classNameList?: string;
  classNameListInline?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
  classNameListUnstyled?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  classNameNoItems?: string;
  classNameShipmentOption?: string;
  classNameTable?: string;
  classNameTableContainer?: string;
  classNameVariationsList?: string;
  customSuccessMessage?: string;
  domainId?: number;
  googlePlacesLoaded?: boolean;
  hideHead?: boolean;
  includeTheme?: boolean;
  initialiseCart?: boolean;
  onClickClose?: () => void;
  productFormClassNames?: any;
  showUserTermsAndConditions?: boolean;
  apiUrl?: string;
  urlFrontend?: string;
  urlTrackingPage?: string;
}

const CartProvider = ({
  children,
  classNameAlertError = 'alert-danger',
  classNameAlertInfo = 'alert-info',
  classNameAlertSuccess = 'alert-success',
  classNameAlertWarning = 'alert-warning',
  classNameBtn = 'btn',
  classNameBtnBack = 'btn-lg btn-default',
  classNameBtnCartClear = 'btn-lg btn-danger',
  classNameBtnClose = 'merchi-btn-close',
  classNameBtnDanger = 'btn btn-md btn-danger',
  classNameBtnDefault = 'btn btn-md btn-default',
  classNameBtnDownloadInvoice = 'btn btn-lg btn-primary',
  classNameBtnEditCartItem = 'btn btn-lg btn-primary ml-auto',
  classNameBtnPrimary = 'btn btn-md btn-primary',
  classNameBtnLink = 'btn-md btn-link',
  classNameBtnNext = 'btn-lg btn-primary ml-auto',
  classNameBtnNextComplete = 'btn-lg btn-success ml-auto',
  classNameBtnPay = 'btn-lg btn-primary width-full',
  classNameCartBody = 'merchi-cart-body',
  classNameCartFooter = 'merchi-cart-footer',
  classNameCartFormCheckbox = 'form-check-input',
  classNameCartFormGroup = 'form-group merchi-form-group',
  classNameCartFormGroupButton = 'merchi-form-group-button',
  classNameCartFormGroupCheckbox = 'form-check',
  classNameCartFormInput = 'form-control',
  classNameCartFormLabelCheckbox = '',
  classNameCartInputError = 'text-danger',
  classNameCartNav = 'nav merchi-nav-tabs merchi-nav merchi-nav-fill merchi-nav-pills',
  classNameCartRow = 'merchi-row',
  classNameCartRowColumn = 'merchi-column',
  classNameCartTabItem = 'nav-item merchi-nav-item',
  classNameCartTabItemLink = 'merchi-nav-link',
  classNameCartToggleIconButton = 'cart-icon-button-class',
  classNameCartGoogleSuggestList = 'list-group m-b-0',
  classNameCartGoogleSuggestListItem = 'list-group-item cursor-pointer',
  classNameCartHeader = 'merchi-cart-header',
  classNameCartItemFeatureImage = 'img-rounded m-10',
  classNameCartItemInfo = 'text-muted font-weight-normal font-italic',
  classNameCartItemInfoCell = 'border-0 align-middle',
  classNameCartItemInfoCellRight = 'border-0 align-middle text-right',
  classNameCartItemInfoContainer = 'ml-3 d-inline-block align-middle',
  classNameCartTab = 'merchi-tab-content',
  classNameCartTabPanel = 'merchi-tab-panel',
  classNameCartTitle = 'merchi-cart-title',
  classNameCartTotalContainer = 'merchi-cart-total-container',
  classNameCartTotalItem = 'merchi-cart-total-item',
  classNameCartTotalItemPrice = 'merchi-cart-total-item-price',
  classNameClearCartContainer = 'merchi-cart-clear-container',
  classNameClearCartText = 'merchi-cart-clear-text',
  classNameListClientInfo = 'merchi-cart-client-info-list',
  classNameList = 'list-group',
  classNameListInline = 'list-inline',
  classNameListUnstyled = 'list-unstyled',
  classNameListContainer = 'pb-2',
  classNameListItem = 'list-group-item',
  classNameLoadingTemplate = 'merchi-loading-template',
  classNameLoadingTemplateContainer = 'merchi-loading-template-container',
  classNameNoItems = 'merchi-no-cart-items',
  classNameShipmentOption = 'merchi-shipment-option',
  classNameTable = 'table',
  classNameTableContainer = 'table-responsive',
  classNameVariationsList = 'list-unstyled list-inline',
  customSuccessMessage,
  domainId,
  hideHead = false,
  includeTheme = false,
  initialiseCart = true,
  onClickClose,
  productFormClassNames = {},
  showUserTermsAndConditions = true,
  apiUrl = 'https://api.merchi.co/v6/',
  urlFrontend = 'https://merchi.co/',
  urlTrackingPage,
}: PropsCartProvider) => {
  const [googlePlacesLoaded, setGoogleMapsLoaded] = useState(false);
  // Persistent callback setup
  if (typeof window !== 'undefined') {
    if (!(window as any).googleMapsScriptLoaded) {
      (window as any).googleMapsScriptLoaded = () => {
        setGoogleMapsLoaded(true);
      };
    }
  }
  return (
    <CartContext.Provider
      value={
        {
          classNameAlertError,
          classNameAlertInfo,
          classNameAlertSuccess,
          classNameAlertWarning,
          classNameBtn,
          classNameBtnBack,
          classNameBtnCartClear,
          classNameBtnClose,
          classNameBtnDanger,
          classNameBtnDefault,
          classNameBtnDownloadInvoice,
          classNameBtnEditCartItem,
          classNameBtnPrimary,
          classNameBtnLink,
          classNameBtnNext,
          classNameBtnNextComplete,
          classNameBtnPay,
          classNameCartBody,
          classNameCartFooter,
          classNameCartFormCheckbox,
          classNameCartFormGroup,
          classNameCartFormGroupButton,
          classNameCartFormGroupCheckbox,
          classNameCartFormInput,
          classNameCartFormLabelCheckbox,
          classNameCartInputError,
          classNameCartNav,
          classNameCartRow,
          classNameCartRowColumn,
          classNameCartTabItem,
          classNameCartTabItemLink,
          classNameCartToggleIconButton,
          classNameCartGoogleSuggestList,
          classNameCartGoogleSuggestListItem,
          classNameCartHeader,
          classNameCartItemFeatureImage,
          classNameCartItemInfo,
          classNameCartItemInfoCell,
          classNameCartItemInfoCellRight,
          classNameCartItemInfoContainer,
          classNameCartTab,
          classNameCartTabPanel,
          classNameCartTitle,
          classNameCartTotalContainer,
          classNameCartTotalItem,
          classNameCartTotalItemPrice,
          classNameClearCartContainer,
          classNameClearCartText,
          classNameListClientInfo,
          classNameList,
          classNameListInline,
          classNameListContainer,
          classNameListItem,
          classNameListUnstyled,
          classNameLoadingTemplate,
          classNameLoadingTemplateContainer,
          classNameNoItems,
          classNameShipmentOption,
          classNameTable,
          classNameTableContainer,
          classNameVariationsList,
          customSuccessMessage,
          domainId,
          googlePlacesLoaded,
          hideHead,
          includeTheme,
          initialiseCart,
          onClickClose,
          productFormClassNames,
          showUserTermsAndConditions,
          apiUrl,
          urlFrontend,
          urlTrackingPage,
        } as PropsCart
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
