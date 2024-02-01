import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Alert } from './components';
import { closeAlert } from './store';
import { useCartContext } from './CartProvider';

function CartAlert() {
  const { classNameBtnClose } = useCartContext();
  const { alert } = useSelector((s: any) => s.stateCartAlert);
  const { icon, message, show, title } = alert;
  return (
    <>
      {show && (
        <Alert alertType={alert.type}>
          {icon &&
            <FontAwesomeIcon icon={icon} />
          } <strong>{title}</strong> {message}
          <button
            type="button"
            className={classNameBtnClose}
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeAlert}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Alert>
      )}
    </>
  );
}

export default CartAlert;
