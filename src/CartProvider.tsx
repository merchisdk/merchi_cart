import * as React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { faCheckCircle, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert, Tab } from '../types';
import {
  getCartShipmentGroupsAndQuotes,
  makeCart,
  makeCartItem,
  stripeIsValidAndActive,
} from './utilities/cart';
import { cartEmbed } from './utilities/helpers';
import { initTabs, tabIdItems, tabShipment } from './utilities/tabs';
import { Merchi } from 'merchi_sdk_ts';
import { getCartCookie, getCartCookieToken, setCartCookie } from './utilities/cookie';
import { makeAddress } from './utilities/address';
import { appendStyleSheetText } from './utilities/helpers';
import { makeJob } from './utilities/job';
import { makeProduct } from './utilities/product';

export interface PropsCart {
  cart: any;
  setCart: (cartJson: any) => void;
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;

  alert: Alert;
  alertError: (message: string) => void;
  alertSuccess: (message: string) => void;
  setAlert: (alert: Alert) => void;
  cartItem: any;
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
  classNameCartTotaListContainer?: string;
  classNameCartTotalItemPrice?: string;
  classNameClearCartContainer?: string;
  classNameClearCartText?: string;
  classNameCartToggleIconButton?: string;
  classNameListClientInfo?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
  classNameListItemCartTotals?: string;
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

  // Discount code input props
  discountButtonText?: string;
  discountClassName?: string;
  discountClassNameMainContainer?: string;
  discountClassNameButtonItemRemove?: string;
  discountClassNameButton?: string;
  discountClassNameButtonContainer?: string;
  discountClassNameErrorMessage?: string;
  discountClassNameInput?: string;
  discountClassNameListItem?: string;
  discountClassNameListItems?: string;
  discountClassNameInputContainer?: string;
  discountShowAppliedItems?: boolean;
  showDiscountCode?: boolean;

  domainId?: number;
  googlePlacesLoaded?: boolean;
  hideHead?: boolean;

  invoiceJson: any;
  setInvoiceJson: (invoiceJson: any) => void;

  includeTheme?: boolean,
  initialiseCart?: boolean;

  cartSettingsInvalid: boolean;

  fetchingCart: boolean;
  setFetchingCart: (fetchingCart: boolean) => void;

  fetchingShipmentGroups: boolean;

  isCartModalOpen?: boolean;
  setIsCartModalOpen?: (isOpen: boolean) => void;
  onClickClose?: () => void;
  toggleCartModal: () => void;

  showUserTermsAndConditions?: boolean;
  productFormClassNames?: any;
  apiUrl?: string;

  updateCartShipmentAddress: (addressJson: any) => void;

  urlFrontend?: string;
  urlTrackingPage?: string;
  setCartItem: (cartItem: any) => void;

  tabs: Tab[];
  setTabs: (tabs: Tab[]) => void;

  clearCart: () => void;
  closeClearCart: () => void;

  setCartComplete: () => void;
  refetchCart: () => void;

  loadingTotals: boolean;
  setLoadingTotals: (loading: boolean) => void;

  setActiveTabAndEditDisabled: (nextTab: {tabId: number, tabIndexToSet: number, disabled: boolean}) => void;
  loading: boolean;
}

const CartContext = createContext<PropsCart>({
  cart: {},
  setCart: console.log,
  activeTabIndex: 0,
  setActiveTabIndex: console.log,

  alert: ({} as Alert),
  alertError: console.log,
  alertSuccess: console.log,
  setAlert: console.log,
  cartItem: {},
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
  classNameCartTotaListContainer: undefined,
  classNameCartTotalItemPrice: undefined,
  classNameCartToggleIconButton: undefined,
  classNameClearCartContainer: undefined,
  classNameClearCartText: undefined,
  classNameListClientInfo: undefined,
  classNameListContainer: undefined,
  classNameListItem: undefined,
  classNameListItemCartTotals: undefined,
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

  // Discount code input props
  discountButtonText: undefined,
  discountClassName: undefined,
  discountClassNameButton: undefined,
  discountClassNameButtonContainer: undefined,
  discountClassNameButtonItemRemove: undefined,
  discountClassNameErrorMessage: undefined,
  discountClassNameInput: undefined,
  discountClassNameInputContainer: undefined,
  discountClassNameListItem: undefined,
  discountClassNameListItems: undefined,
  discountClassNameMainContainer: undefined,
  discountShowAppliedItems: true,
  showDiscountCode: true,

  domainId: undefined,
  googlePlacesLoaded: false,
  hideHead: false,

  invoiceJson: {},
  setInvoiceJson: console.log,

  includeTheme: false,
  initialiseCart: true,

  cartSettingsInvalid: false,

  fetchingCart: false,
  setFetchingCart: console.log,

  fetchingShipmentGroups: false,

  isCartModalOpen: false,
  setIsCartModalOpen: console.log,
  onClickClose: undefined,
  toggleCartModal: console.log,

  productFormClassNames: {},
  showUserTermsAndConditions: undefined,
  apiUrl: undefined,

  updateCartShipmentAddress: console.log,

  urlFrontend: undefined,
  urlTrackingPage: undefined,
  setCartItem: console.log,
  tabs: [tabShipment],
  setTabs: console.log,

  clearCart: console.log,
  closeClearCart: console.log,

  setCartComplete: console.log,
  refetchCart: console.log,

  loadingTotals: false,
  setLoadingTotals: console.log,
  setActiveTabAndEditDisabled: console.log,
  loading: false,
});

export const useCartContext = () => useContext(CartContext);

interface PropsCartProvider {
  cart?: any;
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
  classNameCartTotaListContainer?: string;
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
  classNameListItemCartTotals?: string;
  classNameListUnstyled?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  classNameNoItems?: string;
  classNameShipmentOption?: string;
  classNameTable?: string;
  classNameTableContainer?: string;
  classNameVariationsList?: string;
  customSuccessMessage?: string;

  // Discount code input props
  discountButtonText?: string;
  discountClassName?: string;
  discountClassNameMainContainer?: string;
  discountClassNameButtonItemRemove?: string;
  discountClassNameButton?: string;
  discountClassNameButtonContainer?: string;
  discountClassNameErrorMessage?: string;
  discountClassNameInput?: string;
  discountClassNameListItem?: string;
  discountClassNameListItems?: string;
  discountClassNameInputContainer?: string;
  discountShowAppliedItems?: boolean;
  showDiscountCode?: boolean;

  domainId?: number;
  googlePlacesLoaded?: boolean;
  hideHead?: boolean;
  includeTheme?: boolean;
  initialiseCart?: boolean;

  isCartModalOpen?: boolean;
  setIsCartModalOpen?: (isOpen: boolean) => void;

  onClickClose?: () => void;
  productFormClassNames?: any;
  showUserTermsAndConditions?: boolean;
  apiUrl?: string;
  urlFrontend?: string;
  urlTrackingPage?: string;
}

const CartProvider = ({
  cart: initCart = {},
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
  classNameCartTotaListContainer = 'merchi-cart-total-list-container',
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
  classNameListItemCartTotals = 'list-group-item d-flex justify-content-between align-items-center',
  classNameLoadingTemplate = 'merchi-loading-template',
  classNameLoadingTemplateContainer = 'merchi-loading-template-container',
  classNameNoItems = 'merchi-no-cart-items',
  classNameShipmentOption = 'merchi-shipment-option',
  classNameTable = 'table',
  classNameTableContainer = 'table-responsive',
  classNameVariationsList = 'list-unstyled list-inline',
  customSuccessMessage,
  domainId,

  // Discount code input props
  discountButtonText = 'Apply',
  discountClassName = 'merchi-discount-group-container',
  discountClassNameButton = 'btn btn-primary btn-lg',
  discountClassNameButtonContainer = 'col-auto',
  discountClassNameButtonItemRemove = 'btn btn-sm btn-link',
  discountClassNameErrorMessage = 'text-danger',
  discountClassNameInput = 'form-control input-lg',
  discountClassNameInputContainer,
  discountClassNameListItem = 'list-group-item d-flex align-items-center justify-content-between mt-2',
  discountClassNameListItems = 'list-group',
  discountClassNameMainContainer,
  discountShowAppliedItems = true,
  showDiscountCode = true,

  hideHead = false,
  includeTheme = false,
  initialiseCart = true,

  isCartModalOpen,
  setIsCartModalOpen,
  onClickClose,

  productFormClassNames = {},
  showUserTermsAndConditions = true,
  apiUrl = 'https://api.merchi.co/v6/',
  urlFrontend = 'https://merchi.co/',
  urlTrackingPage,
}: PropsCartProvider) => {
  const merchi = new Merchi();
  const [cart, setCart] = useState(({...initCart} as any));

  const [isOpen, setIsOpen] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabs, setTabs] = useState([...initTabs]);

  function setActiveTabAndEditDisabled(nextTab: {tabId: number, tabIndexToSet: number, disabled: boolean}) {
    const { tabId, tabIndexToSet, disabled } = nextTab;
    tabs[tabIndexToSet].disabled = disabled;
    setActiveTabIndex(tabId);
  }

  const [googlePlacesLoaded, setGoogleMapsLoaded] = useState(false);
  // Persistent callback setup
  if (typeof window !== 'undefined') {
    if (!(window as any).googleMapsScriptLoaded) {
      (window as any).googleMapsScriptLoaded = () => {
        setGoogleMapsLoaded(true);
      };
    }
  }
  const [cartItem, setCartItem] = useState(({} as any));

  const [alert, setAlert] = useState(({
    icon: faInfoCircle,
    message: '',
    show: false,
    title: '',
    type: 'info',
  } as Alert));

  function alertSuccess(message: string) {
    setAlert({
      icon: faCheckCircle,
      message,
      show: true,
      title: 'Success!',
      type: 'success',
    });
  }

  function alertError(message: string) {
    setAlert({
      icon: faExclamationTriangle,
      message,
      show: true,
      title: 'Error!',
      type: 'danger',
    });
  }

  function closeClearCart() {
    setActiveTabIndex(tabIdItems);
  }

  const [fetchingCart, setFetchingCart] = useState(false);
  const [cartSettingsInvalid, setCartSettingsInvalid] = useState(false);

  // Create cart and save cart cookie
  async function createCartAndCookie() {
    setFetchingCart(true);
    try {
      const cart = makeCart({domain: {id: domainId}}, true);
      await cart.create({embed: cartEmbed});
      const cartJson = await cart.toJson();
      if (domainId) setCartCookie(Number(domainId), cartJson, undefined);
      setCart({...cartJson});
    } catch (e: any) {
      alertError(e.errorMessage || e.message || 'Unable to fetch cart.');
    } finally {
      setFetchingCart(false);
    }
  }

  async function getCart(cartIdAndToken: Array<string>) {
    const id = Number(cartIdAndToken[0]);

    // Set the cart token on the merchi entity
    if (cartIdAndToken[1]) merchi.cartToken = cartIdAndToken[1];
    setFetchingCart(true);
    try {
      const cart = await merchi.Cart.get(id, {embed: cartEmbed});
      const cartJson = await cart.toJson();
      if (stripeIsValidAndActive(cartJson)) {
        setCart({...cartJson});
      } else {
        console.error(
          `MErhci cart error: Stripe payment ` +
          `options have not been correctly set up. ` +
          `Check the company profile payment options tab ` +
          `to set and edit stripe payment options.`
        );
        setCartSettingsInvalid(true);
      }
    } catch(e: any){
      await createCartAndCookie();
    } finally {
      setFetchingCart(false);
    }
  }

  async function actionGetMerchiCart() {
    const cartIdAndToken = await getCartCookie((domainId as number));
    if (cartIdAndToken) {
      getCart(cartIdAndToken);
    } else {
      createCartAndCookie();
    }
  }

  async function clearCart() {
    await createCartAndCookie();
    closeClearCart();
  }

  const [fetchingShipmentGroups, setFetchingShipmentGroups] = useState(false);
  async function updateCartShipmentAddress(address: any) {
    // Updates the receiver address on cart and fetches new shipment quotes
    const token = await getCartCookieToken((domainId as string | number));
    const receiverAddress = makeAddress(address, true);
    const cartEnt = makeCart(cart, false, token);
    setFetchingShipmentGroups(true);
    try {
      cartEnt.receiverAddress = receiverAddress;
      await cartEnt.save({embed: cartEmbed});
      const cartWithGroups = await getCartShipmentGroupsAndQuotes(cartEnt.toJson());
      const cartJson = cartWithGroups.toJson();
      setCart({...cartJson});
    } catch (e: any) {
      alertError(e.errorMessage || e.message || 'Unable to set address');
    } finally {
      setFetchingShipmentGroups(false);
    }
  }

  async function getMerchiCartValues() {
    const { cartItems, currency, subtotalCost, taxAmount, totalCost } = (cart as any);
    const cartItemsCount = cartItems ? cartItems.length : 0;
    return {
      cart,
      cartItemsCount,
      currency: currency || '',
      subtotalCost: subtotalCost || 0,
      taxAmount: taxAmount || 0,
      totalCost: totalCost || 0,
    };
  }

  async function isMerchiCartFetching() {
    return fetchingCart;
  }

  const [loading, setLoading] = useState(false);

  // Fetch the associated cart theme via the cart domain.
  async function actionFetchTheme() {
    setLoading(true);
    try {
      const domain = await merchi.Domain.get(domainId, {embed: {activeTheme: {mainCss: {}}}});
      const theme = domain.activeTheme;
      await appendStyleSheetText(theme.mainCss, () => setLoading(false));
    } catch (e: any) {
      alertError(e.errorMessage || e.message || 'Error fetching domain theme.');
      setLoading(false);
    }
  }

  async function setCartComplete() {
    await createCartAndCookie();
    location.reload();
  }

  async function refetchCart() {
    await actionGetMerchiCart();
  }

  const [invoiceJson, setInvoiceJson] = useState({});

  const [loadingTotals, setLoadingTotals] = useState(false);

  async function addCartItem(
    jobJson: any,
    onSuccess: (cartItem: any) => void,
    onError: (e: any) => void,
  ) {
    setFetchingCart(true);
    const jobEnt = makeJob(jobJson, true);
    const cartToken = await getCartCookieToken((domainId as number));
    const cartEnt = makeCart(cart, false, cartToken);
    const cartItemEnt = makeCartItem({}, true);
    const cartItemProduct = makeProduct({ id: (jobEnt.product as any).id });
    cartItemEnt.cart = cartEnt;
    cartItemEnt.quantity = jobEnt.quantity;
    cartItemEnt.product = cartItemProduct;
    cartItemEnt.variations = jobEnt.variations;
    cartItemEnt.variationsGroups = jobEnt.variationsGroups;
    cartItemEnt.taxType = jobEnt.taxType;
    try {
      const item = await cartItemEnt.create();
      const itemJson = await item.toJson();
      onSuccess(itemJson);
    } catch(e: any) {
      onError(e);
    } finally {
      setFetchingCart(false);
    }
  }

  const toggleCartModal = () => {
    const newIsOpen = setIsCartModalOpen ? !isCartModalOpen : !isOpen;
  
    // Toggle the modal state
    if (setIsCartModalOpen) {
      setIsCartModalOpen(newIsOpen);
    } else {
      setIsOpen(newIsOpen);
    }
  
    // Refetch the cart if the modal is opening
    if (newIsOpen) {
      refetchCart();
    }
  };
  
  // Set a global toggle function for cart wrapper
  if (window && typeof window !== 'undefined') {
    (window as any).addCartItem = addCartItem;
    (window as any).toggleCartOpen = toggleCartModal;
    (window as any).getCart = () => actionGetMerchiCart();
    (window as any).getMerchiCartValues = getMerchiCartValues;
    (window as any).isMerchiCartFetching = isMerchiCartFetching;
    (window as any).setCartComplete = setCartComplete;
    (window as any).refetchCart = refetchCart;
  }

  useEffect(() => {
    if (domainId) actionGetMerchiCart();
    if (domainId && includeTheme) actionFetchTheme(); 
  }, [domainId]);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,

        cartSettingsInvalid, // if true do show error to user about settings

        activeTabIndex,
        setActiveTabIndex,
        alert,
        alertSuccess,
        alertError,
        setAlert,
        cartItem,
        setCartItem,
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
        classNameCartTotaListContainer,
        classNameCartTotalItemPrice,
        classNameClearCartContainer,
        classNameClearCartText,
        classNameListClientInfo,
        classNameList,
        classNameListInline,
        classNameListContainer,
        classNameListItem,
        classNameListItemCartTotals,
        classNameListUnstyled,
        classNameLoadingTemplate,
        classNameLoadingTemplateContainer,
        classNameNoItems,
        classNameShipmentOption,
        classNameTable,
        classNameTableContainer,
        classNameVariationsList,
        customSuccessMessage,

        discountButtonText,
        discountClassName,
        discountClassNameButton,
        discountClassNameButtonContainer,
        discountClassNameButtonItemRemove,
        discountClassNameErrorMessage,
        discountClassNameInput,
        discountClassNameInputContainer,
        discountClassNameListItem,
        discountClassNameListItems,
        discountClassNameMainContainer,
        discountShowAppliedItems,
        showDiscountCode,

        fetchingCart, // boolean indicator true when fetching cart
        setFetchingCart,

        fetchingShipmentGroups, // boolean for fetching shipment groups

        domainId,
        googlePlacesLoaded,
        hideHead,

        invoiceJson,
        setInvoiceJson,

        includeTheme,
        initialiseCart,

        isCartModalOpen: typeof isCartModalOpen !== 'undefined' ? isCartModalOpen : isOpen, // Control the cart modal open and closed
        toggleCartModal,

        onClickClose,
        productFormClassNames,
        showUserTermsAndConditions,
        apiUrl,

        updateCartShipmentAddress,

        urlFrontend,
        urlTrackingPage,

        tabs,
        setTabs,

        clearCart, // Resets the cart and it's values
        closeClearCart,

        setCartComplete, // creates a token and cart and then reloads the page
        refetchCart, // used to refetch the cart

        loading,

        loadingTotals,
        setLoadingTotals,

        setActiveTabAndEditDisabled,
      } as PropsCart}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
