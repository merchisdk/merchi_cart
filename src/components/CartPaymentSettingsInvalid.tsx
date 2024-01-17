import * as React from 'react';

export default function CartPaymentSettingsInvalid() {
  return (
    <div className='merchi-loading-container'>
      <div className='merchi-payment-gateway-inactive' />
      <p className="merchi-loading-container-text">
        Payment gateway is currently inactive.
      </p>
    </div>
  );
}
