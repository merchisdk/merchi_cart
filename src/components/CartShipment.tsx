import { useDispatch } from 'react-redux';
import Title from './Title';
import { sliceCart, tabIdShipment } from '../slices/sliceCart';
import { addressInOneLine } from '../utilities/address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../buttons';
import { useCartContext } from '../CartProvider';

interface Props {
  cart: any;
}

function CartShipment({ cart }: Props) {
  const {
    classNameBtnDefault,
    classNameListContainer,
    classNameListUnstyled,
  } = useCartContext();
  const { receiverAddress, receiverNotes } = cart;
  const address = receiverAddress ? receiverAddress : null;
  const dispatch = useDispatch();
  function openShipmentTab() {
    dispatch(sliceCart.actions.setActiveTab(tabIdShipment));
  }
  return (
    <div className={classNameListContainer}>
      <Title
        icon={faTruck}
        Title='Ship to'
      />
      <ul
        className={classNameListUnstyled}
        style={{fontSize: '15px', marginBottom: '1rem'}}
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
        onClick={openShipmentTab}
        className={classNameBtnDefault}
      >
        <FontAwesomeIcon icon={faEdit} /> {address ? ' Change' : ' Set'}
      </Button>
    </div>
  );
}

export default CartShipment;
