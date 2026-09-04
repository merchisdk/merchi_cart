import * as React from 'react';
import { StripePaymentForm } from 'merchi_invoice';
import { useCartContext } from '../CartProvider';
import { tabIdPaymentSuccess } from '../utilities/tabs';

export default function StripeCardForm() {
  const { alertError, apiUrl, cart, setActiveTabIndex, setInvoiceJson } = useCartContext();
  return <StripePaymentForm apiUrl={apiUrl || 'https://api.merchi.co/v6/'} resource="cart"
    resourceId={cart.id} resourceToken={cart.token || cart.cartToken} onError={alertError}
    onSuccess={invoice => {
      setInvoiceJson(invoice);
      setActiveTabIndex(tabIdPaymentSuccess);
    }} />;
}
