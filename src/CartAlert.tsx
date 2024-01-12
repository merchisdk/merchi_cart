import * as React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { closeAlert } from './store';
import { useCartContext } from './CartProvider';

function CartAlert() {
  const { 
    classNameAlertError,
    classNameAlertInfo,
    classNameAlertSuccess,
    classNameAlertWarning,
    classNameBtnClose,
   } = useCartContext();
  const { alert } = useSelector((s: any) => s.cartAlertState);
  const { icon, message, show, title } = alert;
  let className = classNameAlertInfo;
  if (alert.type === 'success') {
    className = classNameAlertSuccess;
  }
  if (alert.type === 'error') {
    className = classNameAlertError;
  }
  if (alert.type === 'warning') {
    className = classNameAlertWarning;
  }
  return (
    <>
      {show && (
        <div
          className={className}
          onClick={closeAlert}
        >
          {icon &&
            <FontAwesomeIcon icon={icon} />
          } <strong>{title}</strong> {message}
          <button
            type="button"
            className={classNameBtnClose}
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
    </>
  );
}

export default CartAlert;
