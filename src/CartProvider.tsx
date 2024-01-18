'use client';
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
  classNameBtnPrimary?: string;
  classNameBtnLink?: string;
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnPay?: string;
  classNameCartBody?: string;
  classNameCartFooter?: string;

  classNameCartFormCheckbox?: string;
  classNameCartFormGroup?: string;
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
  includeTheme?: boolean,
  initialiseCart?: boolean;
  onClickClose?: () => void;
  showUserTermsAndConditions?: boolean;
  productFormClassNames?: any;
  urlApi?: string;
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
  classNameBtnPrimary?: string;
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnLink?: string;
  classNameBtnPay?: string;
  classNameCartBody?: string;
  classNameCartFooter?: string;
  classNameCartFormCheckbox?: string;
  classNameCartFormGroup?: string;
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
  includeTheme?: boolean;
  initialiseCart?: boolean;
  onClickClose?: () => void;
  productFormClassNames?: any;
  showUserTermsAndConditions?: boolean;
  urlApi?: string;
  urlFrontend?: string;
  urlTrackingPage?: string;
}

const CartProvider = ({
  children,
  classNameAlertError = 'alert alert-error alert-dismissible',
  classNameAlertInfo = 'alert alert-info alert-dismissible',
  classNameAlertSuccess = 'alert alert-success alert-dismissible',
  classNameAlertWarning = 'alert alert-warning alert-dismissible',
  classNameBtn = 'btn',
  classNameBtnBack = 'btn-lg btn-default pull-left',
  classNameBtnCartClear = 'btn-lg btn-danger mr-auto',
  classNameBtnClose = 'btn-close',
  classNameBtnDanger = 'btn btn-md btn-danger',
  classNameBtnDefault = 'btn btn-md btn-default',
  classNameBtnDownloadInvoice = 'btn btn-lg btn-primary',
  classNameBtnPrimary = 'btn btn-md btn-primary',
  classNameBtnLink = 'btn-md btn-link',
  classNameBtnNext = 'btn-lg btn-primary',
  classNameBtnNextComplete = 'btn-lg btn-success',
  classNameBtnPay = 'btn-lg btn-primary width-full',
  classNameCartBody = 'merchi-cart-body',
  classNameCartFooter = 'merchi-cart-footer', // add to sass
  classNameCartFormCheckbox = 'form-check-input',
  classNameCartFormGroup = 'form-group',
  classNameCartFormGroupCheckbox = 'form-check',
  classNameCartFormInput = 'form-control',
  classNameCartFormLabelCheckbox = '',
  classNameCartInputError = 'text-danger',
  classNameCartNav = 'nav nav-tabs merchi-nav merchi-nav-fill merchi-nav-pills',
  classNameCartRow = 'merchi-row',
  classNameCartRowColumn = 'merchi-column',
  classNameCartTabItem = 'nav-item merchi-nav-item',
  classNameCartTabItemLink = 'nav-link merchi-nav-link',
  classNameCartGoogleSuggestList = 'list-group m-b-0',
  classNameCartGoogleSuggestListItem = 'list-group-item cursor-pointer',
  classNameCartHeader = 'merchi-cart-header', // add to sass
  classNameCartItemFeatureImage = 'img-rounded m-10',
  classNameCartItemInfo = 'text-muted font-weight-normal font-italic',
  classNameCartItemInfoCell = 'border-0 align-middle',
  classNameCartItemInfoCellRight = 'border-0 align-middle text-right',
  classNameCartItemInfoContainer = 'ml-3 d-inline-block align-middle',
  classNameCartTab = 'merchi-tab-content',
  classNameCartTabPanel = 'merchi-tab-panel',
  classNameCartTitle = 'merchi-cart-title', // add to sass // paddingBottom: '0.5rem', paddingTop: '0.5rem', textAlign: 'center',
  classNameCartTotalContainer = 'merchi-cart-total-container', // add to sass
  classNameCartTotalItem = 'merchi-cart-total-item', // add to sass; original text-right cart-cell-width-subtotal
  classNameCartTotalItemPrice = 'merchi-cart-total-item-price', // add to sass: original text-right
  classNameClearCartContainer = 'merchi-cart-clear-container',
  classNameClearCartText = 'merchi-cart-clear-text',
  classNameListClientInfo = 'merchi-cart-client-info-list', // add to sass: original className='list-unstyled text-center' fontSize: '15px', listStyle: 'none', paddingBottom: '0px', paddingLeft: '0px'
  classNameList = 'list-group',
  classNameListInline = 'list-inline',
  classNameListUnstyled = 'list-unstyled',
  classNameListContainer = 'pb-2',
  classNameListItem = 'list-group-item',
  classNameLoadingTemplate = 'merchi-loading-template',
  classNameLoadingTemplateContainer = 'merchi-loading-template-container',
  classNameNoItems = 'merchi-no-cart-items',
  classNameShipmentOption = 'merchi-shipment-option',
  classNameTable = 'table table-bordered',
  classNameTableContainer = 'table-responsive',
  classNameVariationsList = 'list-unstyled list-inline',
  customSuccessMessage,
  domainId,
  includeTheme = false,
  initialiseCart = true,
  onClickClose = () => console.log('close merchi cart!'),
  productFormClassNames = {},
  showUserTermsAndConditions = true,
  urlApi = 'https://api.merchi.co/v6/',
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
          classNameBtnPrimary,
          classNameBtnLink,
          classNameBtnNext,
          classNameBtnNextComplete,
          classNameBtnPay,
          classNameCartBody,
          classNameCartFooter,
          classNameCartFormCheckbox,
          classNameCartFormGroup,
          classNameCartFormGroupCheckbox,
          classNameCartFormInput,
          classNameCartFormLabelCheckbox,
          classNameCartInputError,
          classNameCartNav,
          classNameCartRow,
          classNameCartRowColumn,
          classNameCartTabItem,
          classNameCartTabItemLink,
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
          includeTheme,
          initialiseCart,
          onClickClose,
          productFormClassNames,
          showUserTermsAndConditions,
          urlApi,
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
