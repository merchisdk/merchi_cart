import * as React from 'react';
import { useDispatch } from 'react-redux';
import { axtionSetCartClient } from '../store';
import {
  primaryEmail,
  primaryPhone,
} from '../utilities/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../buttons/Button';
import Title from './Title';
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

interface Props {
  client: any;
}

function CartClient({ client }: Props) {
  const dispatch = useDispatch();
  function clearClient() {
    axtionSetCartClient(null);
  }
  return (
    <div>
      <Title icon={faUserCircle} Title='Checkout as' />
      <ClientInfo client={client} />
      <Button onClick={clearClient}>
        <FontAwesomeIcon icon={faUserTimes} /> Change
      </Button>
    </div>
  );
}

export default CartClient;
