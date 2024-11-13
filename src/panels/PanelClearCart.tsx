import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { tabIdClearCart } from '../utilities/tabs';
import { Button } from '../buttons';
import { CartBody, CartTabPanel } from '../components';
import { useCartContext } from '../CartProvider';

function PanelClearCart() {
  const { 
    classNameBtnDanger,
    classNameBtnDefault,
    classNameClearCartContainer,
    classNameClearCartText,
    clearCart,
    closeClearCart,
   } = useCartContext();
  return (
    <CartTabPanel tabId={tabIdClearCart}>
      <CartBody>
        <div style={{display: 'flex', justifyContent: 'center', minHeight: '450px'}}>
          <div className={classNameClearCartContainer}>
            <h2><FontAwesomeIcon icon={faTrashAlt} /></h2>
            <h3>Clear Cart</h3>
            <p className={classNameClearCartText}>
              Are you sure you would like to clear this cart?
            </p>
            <p>
              <Button
                className={classNameBtnDefault}
                onClick={closeClearCart}
              >
                Cancel
              </Button>
            </p>
            <p>
              <Button
                className={classNameBtnDanger}
                onClick={clearCart}
              >
                Yes, clear cart
              </Button>
            </p>
          </div>
        </div>
      </CartBody>
    </CartTabPanel>
  );
}

export default PanelClearCart;
