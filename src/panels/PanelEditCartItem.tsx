import { useSelector } from 'react-redux';
import MerchiProductForm from 'merchi_product_form';
import { tabIdItem } from '../slices/sliceCart';
import { actionCartItemEdit } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonBack } from '../buttons';
import {
  CartBody,
  CartFooter,
  CartTabPanel,
} from '../components';
import { useCartContext } from '../CartProvider';

function PanelEditCartItem() {
  const {
    productFormClassNames,
    classNameBtnEditCartItem,
    apiUrl,
  } = useCartContext();
  const { cartItem, savingCartItem } = useSelector((s: any) => s.stateCartItem);
  const { activeTab } = useSelector((s: any) => s.stateCart);
  const formId = 'edit-cart-item-form';
  function onSubmit(jobJson: any) {
    actionCartItemEdit(jobJson);
  }
  return (
    <CartTabPanel tabId={tabIdItem}>
      <CartBody style={{padding: '2rem'}}>
        {activeTab === tabIdItem && cartItem && cartItem.id && cartItem.product && cartItem.product.id &&
          <MerchiProductForm
            apiUrl={apiUrl}
            isCartItem={true}
            initJob={cartItem}
            initProduct={cartItem.product}
            onSubmit={onSubmit}
            productFormId={formId}
            hideRequestQuotationButton={true}
            hidePaymentUpfrontButton={true}
            {...productFormClassNames}
          />
        }
      </CartBody>
      <CartFooter>
        <ButtonBack />
        <Button
          className={classNameBtnEditCartItem}
          disabled={savingCartItem}
          form={formId}
          type='submit'
        >
          {savingCartItem && <FontAwesomeIcon icon={faCircleNotch} spin />}
          {savingCartItem ? ' Loading...' : 'Save'}
        </Button>
      </CartFooter>
    </CartTabPanel>
  );
}

export default PanelEditCartItem;
