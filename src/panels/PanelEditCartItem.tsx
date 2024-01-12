import * as React from 'react';
import { useSelector } from 'react-redux';
import ButtonBack from '../buttons/ButtonBack';
import { tabIdItem } from '../slices/sliceCart';
import {
  alertError,
  cartItemQuoteUpdate,
  patchCartItem,
} from '../store';
import FormPublicProduct from '../../forms/FormPublicProduct';
import { makeCartItem } from '../../ts_helpers/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  ModalBody,
  ModalFooter,
  TabPane,
} from 'reactstrap';

function PanelEditCartItem() {
  const {
    cartItem,
    fetchingPrice,
    savingCartItem,
  } = useSelector((s: any) => s.cartItemState);
  const cartItemEnt = makeCartItem(cartItem);
  const formId = 'edit-cart-item-form';
  function onSubmitForm(data: any, isBuyRequest: boolean) {
    patchCartItem(data.job);
  }
  return (
    <TabPane
      className='p-0'
      tabId={tabIdItem}
    >
      <ModalBody style={{padding: '2rem'}}>
        {cartItem.id &&
          <FormPublicProduct
            errorCallback={alertError}
            formId={formId}
            isCartItem={true}
            job={cartItemEnt}
            jobUpdate={cartItemQuoteUpdate}
            loading={fetchingPrice}
            submitForm={onSubmitForm}
          />
        }
      </ModalBody>
      <ModalFooter className='m-t-0'>
        <ButtonBack />
        <Button
          color='primary'
          disabled={savingCartItem}
          size='md'
          form={formId}
        >
          {savingCartItem &&
            <FontAwesomeIcon icon={faCircleNotch} spin />}
          {savingCartItem ? ' Loading...' : 'Save'}
        </Button>
      </ModalFooter>
    </TabPane>
  );
}

export default PanelEditCartItem;
