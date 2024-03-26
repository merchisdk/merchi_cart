import * as React from 'react';
import { useCartContext } from '../CartProvider';

interface Props {
  alertType?: 'success' | 'danger' | 'warning' | 'info';
  children: any;
}

export default function Alert({ alertType, children }: Props) {
  const { 
    classNameAlertError,
    classNameAlertInfo,
    classNameAlertSuccess,
    classNameAlertWarning,
   } = useCartContext();
  let className = classNameAlertInfo;
  if (alertType === 'success') {
    className = classNameAlertSuccess;
  }
  if (alertType === 'danger') {
    className = classNameAlertError;
  }
  if (alertType === 'warning') {
    className = classNameAlertWarning;
  }
  return (
    <div className={`merchi-cart-modal-alert ${className}`}>
      {children}
    </div>
  );
}
