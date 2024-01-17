import * as React from 'react';
import { useSelector } from 'react-redux';
import MerchiProductForm from 'merchi_product_form';
import { tabIdItem } from '../slices/sliceCart';
import { patchCartItem } from '../store';
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
    classNameBtnPrimary,
    urlApi,
  } = useCartContext();
  const { cartItem, savingCartItem } = useSelector((s: any) => s.stateCartItem);
  const formId = 'edit-cart-item-form';
  function onSubmit(data: any) {
    patchCartItem(data.job);
  }
  return (
    <CartTabPanel tabId={tabIdItem}>
      <CartBody style={{padding: '2rem'}}>
        {cartItem.id &&
          <MerchiProductForm
            apiHost={urlApi}
            isCartItem={true}
            job={cartItem}
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
          className={classNameBtnPrimary}
          disabled={savingCartItem}
          form={formId}
        >
          {savingCartItem && <FontAwesomeIcon icon={faCircleNotch} spin />}
          {savingCartItem ? ' Loading...' : 'Save'}
        </Button>
      </CartFooter>
    </CartTabPanel>
  );
}

export default PanelEditCartItem;
