'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface PropsCart {
  classNameAlertError?: string;
  classNameAlertInfo?: string;
  classNameAlertSuccess?: string;
  classNameAlertWarning?: string;
  classNameBtnClose?: string;
  classNameCartFooter?: string;
  classNameCartHeader?: string;
  classNameListItem?: string;
  classNameListContainer?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
  messageCustomSuccess?: string;
  urlApi?: string;
  urlFrontend?: string;
}

const CartContext = createContext<PropsCart>({
  classNameAlertError: undefined,
  classNameAlertInfo: undefined,
  classNameAlertSuccess: undefined,
  classNameAlertWarning: undefined,
  classNameBtnClose: undefined,
  classNameCartFooter: undefined,
  classNameCartHeader: undefined,
  classNameListItem: undefined,
  classNameListContainer: undefined,
  classNameLoadingTemplate: undefined,
  classNameLoadingTemplateContainer: undefined,
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
  classNameCartFooter?: string;
  classNameCartHeader?: string;
  classNameBtnClose?: string;
  classNameListContainer?: string;
  classNameListItem?: string;
  classNameLoadingTemplate?: string;
  classNameLoadingTemplateContainer?: string;
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
  classNameBtnClose = 'btn-close',
  classNameCartFooter = 'merchi-cart-footer', // add to sass
  classNameCartHeader = 'merchi-cart-header', // add to sass
  classNameListContainer = 'list-group',
  classNameListItem = 'list-group-item',
  classNameLoadingTemplate = 'merchi-loading-template',
  classNameLoadingTemplateContainer = 'merchi-loading-template-container',
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
          classNameBtnClose,
          classNameCartFooter,
          classNameCartHeader,
          classNameListContainer,
          classNameListItem,
          classNameLoadingTemplate,
          classNameLoadingTemplateContainer,
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
