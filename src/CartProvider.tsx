'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface PropsCart {
  classNameAlertError?: string;
  classNameAlertInfo?: string;
  classNameAlertSuccess?: string;
  classNameAlertWarning?: string;
  classNameBtn?: string;
  classNameBtnBack?: string;
  classNameBtnCartClear?: string;
  classNameBtnClose?: string;
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnPay?: string;
  classNameCartFooter?: string;
  classNameCartHeader?: string;
  classNameCartTitle?: string;
  classNameCartTotalContainer?: string;
  classNameCartTotalItem?: string;
  classNameCartTotalItemPrice?: string;
  classNameListClientInfo?: string;
  classNameListItem?: string;
  classNameListContainer?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  classNameTable?: string;
  messageCustomSuccess?: string;
  urlApi?: string;
  urlFrontend?: string;
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
  classNameBtnNext: undefined,
  classNameBtnNextComplete: undefined,
  classNameBtnPay: undefined,
  classNameCartFooter: undefined,
  classNameCartHeader: undefined,
  classNameCartTitle: undefined,
  classNameCartTotalContainer: undefined,
  classNameCartTotalItem: undefined,
  classNameCartTotalItemPrice: undefined,
  classNameListClientInfo: undefined,
  classNameListItem: undefined,
  classNameListContainer: undefined,
  classNameLoadingTemplate: undefined,
  classNameLoadingTemplateContainer: undefined,
  classNameTable: undefined,
  messageCustomSuccess: undefined,
  urlApi: undefined,
  urlFrontend: undefined,
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
  classNameBtnNext?: string;
  classNameBtnNextComplete?: string;
  classNameBtnPay?: string;
  classNameCartFooter?: string;
  classNameCartHeader?: string;
  classNameCartTitle?: string;
  classNameCartTotalContainer?: string;
  classNameCartTotalItem?: string;
  classNameCartTotalItemPrice?: string;
  classNameListClientInfo?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  classNameTable?: string;
  messageCustomSuccess?: string;
  urlApi?: string;
  urlFrontend?: string;
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
  classNameBtnNext = 'btn-lg btn-primary',
  classNameBtnNextComplete = 'btn-lg btn-success',
  classNameBtnPay = 'btn-lg btn-primary width-full',
  classNameCartFooter = 'merchi-cart-footer', // add to sass
  classNameCartHeader = 'merchi-cart-header', // add to sass
  classNameCartTitle = 'merchi-cart-title', // add to sass // paddingBottom: '0.5rem', paddingTop: '0.5rem', textAlign: 'center',
  classNameCartTotalContainer = 'merchi-cart-total-container', // add to sass
  classNameCartTotalItem = 'merchi-cart-total-item', // add to sass; original text-right cart-cell-width-subtotal
  classNameCartTotalItemPrice = 'merchi-cart-total-item-price', // add to sass: original text-right
  classNameListClientInfo = 'merchi-cart-client-info-list', // add to sass: original className='list-unstyled text-center' fontSize: '15px', listStyle: 'none', paddingBottom: '0px', paddingLeft: '0px'
  classNameListContainer = 'list-group',
  classNameListItem = 'list-group-item',
  classNameLoadingTemplate = 'merchi-loading-template',
  classNameLoadingTemplateContainer = 'merchi-loading-template-container',
  classNameTable = 'table table-bordered',
  messageCustomSuccess,
  urlApi = 'https://api.merchi.co/v6/',
  urlFrontend = 'https://merchi.co/',
}: PropsCartProvider) => {
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
          classNameBtnNext,
          classNameBtnNextComplete,
          classNameBtnPay,
          classNameCartFooter,
          classNameCartHeader,
          classNameCartTitle,
          classNameCartTotalContainer,
          classNameCartTotalItem,
          classNameCartTotalItemPrice,
          classNameListClientInfo,
          classNameListContainer,
          classNameListItem,
          classNameLoadingTemplate,
          classNameLoadingTemplateContainer,
          classNameTable,
          messageCustomSuccess,
          urlApi,
          urlFrontend,
        } as PropsCart
      }
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
