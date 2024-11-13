import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Alert } from './components';
import { useCartContext } from './CartProvider';

function CartAlert() {
  const {
    alert,
    classNameBtnClose,
    setAlert,
  } = useCartContext();
  const { icon, message, show, title } = alert;
  return (
    <>
      {show && (
        <Alert alertType={alert.type}>
          <h5>
            {icon && <FontAwesomeIcon icon={icon} />} <strong>{title}</strong> {message}
          </h5>
          <button
            type="button"
            className={classNameBtnClose}
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setAlert({...alert, show: false})}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Alert>
      )}
    </>
  );
}

export default CartAlert;
