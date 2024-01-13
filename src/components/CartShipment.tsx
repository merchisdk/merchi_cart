import * as React from 'react';
import { useDispatch } from 'react-redux';
import Title from './Title';
import { sliceCart, tabIdShipment } from '../slices/sliceCart';
import { addressInOneLine } from '../../ts_helpers/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

interface Props {
  cart: any;
}

function CartShipment(props: Props) {
  const { cart } = props;
  const { receiverAddress, receiverNotes } = cart;
  const address = receiverAddress ? receiverAddress : null;
  const dispatch = useDispatch();
  function openShipmentTab() {
    dispatch(sliceCart.actions.setActiveTab(tabIdShipment));
  }
  return (
    <div className='p-b-20 p-t-0'>
      <Title
        icon={faTruck}
        title='Ship to'
      />
      <ul
        className='list-unstyled'
        style={{fontSize: '15px', marginBottom: '0px'}}
      >
        <li>
          <span style={{display: 'inline-block', marginLeft: 28}}>
            {address ? addressInOneLine(address) : 'Shipping address not set'}
          </span>
        </li>
        <li>
          {receiverNotes}
        </li>
      </ul>
      <Button
        color='default'
        size='md'
        onClick={openShipmentTab}
        className='m-t-20'
      >
        <FontAwesomeIcon icon={faEdit} />
          {address ? ' Change' : ' Set'}
      </Button>
    </div>
  );
}

export default CartShipment;
