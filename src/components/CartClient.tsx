import * as React from 'react';
import {
  primaryEmail,
  primaryPhone,
} from '../utilities/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../buttons/Button';
import Title from './CartTitle';
import { useCartContext } from '../CartProvider';

export function ClientInfo({ client }: any) {
  const { classNameListClientInfo } = useCartContext();
  const { name = 'Returning customer' } = client;
  const emailAddress = primaryEmail(client) || 'Email not shown';
  const phoneNumber = primaryPhone(client) || 'Phone number not shown';
  return (
    <ul className={classNameListClientInfo}>
      <li>{name}</li>
      <li>{emailAddress}</li>
      <li>{phoneNumber}</li>
    </ul>
  );
}

function CartClient() {
  const {
    cart,
    cartClient,
    classNameBtnDefault,
    setCart,
    setCartClient,
  } = useCartContext();
  function clearClient() {
    setCartClient(null);
    setCart({...cart, client: null});
  }
  return (
    <div>
      <Title icon={faUserCircle} title='Checkout as' />
      {cartClient && <ClientInfo client={cartClient} />}
      <Button
        className={classNameBtnDefault}
        onClick={clearClient}
      >
        <FontAwesomeIcon icon={faUserTimes} /> Change
      </Button>
    </div>
  );
}

export default CartClient;
