import Title from './CartTitle';
import { tabIdShipment } from '../utilities/tabs';
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
    setActiveTabIndex,
  } = useCartContext();
  const { receiverAddress, receiverNotes } = cart;
  const address = receiverAddress ? receiverAddress : null;
  function openShipmentTab() {
    setActiveTabIndex(tabIdShipment);
  }
  return (
    <div className={classNameListContainer}>
      <Title
        icon={faTruck}
        title='Ship to'
      />
      <ul
        className={classNameListUnstyled}
        style={{fontSize: '15px', marginBottom: '1rem'}}
      >
        <li>
          <span style={{display: 'inline-block'}}>
            {address ? addressInOneLine(address) : 'Shipping address not set'}
          </span>
        </li>
        {receiverNotes && (
          <li>
            {receiverNotes}
          </li>
        )}
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
