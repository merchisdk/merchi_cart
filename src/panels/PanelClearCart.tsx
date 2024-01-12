import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { doClearCart, closeClearCart } from '../store';
import { tabIdClearCart } from '../slices/sliceCart'
import { Button, ModalBody, TabPane } from 'reactstrap';

interface Props {
}

function PanelClearCart(props: Props) {
  return (
    <TabPane tabId={tabIdClearCart}>
      <ModalBody className='text-center'>
        <div className='m-40'>
          <h2><FontAwesomeIcon icon={faTrashAlt} /></h2>
          <h3>Clear Cart</h3>
          <p className='f-s-16 m-t-40 m-b-40'>
            Are you sure you would like to clear this cart?
          </p>
          <p>
            <Button
              className='m-5'
              size='lg'
              onClick={closeClearCart}>
              Cancel
            </Button>
            <Button
              className='m-5'
              color='danger'
              size='lg'
              onClick={doClearCart}>
              Yes, clear cart
            </Button>
          </p>
        </div>
      </ModalBody>
    </TabPane>
  );
}

export default PanelClearCart;
