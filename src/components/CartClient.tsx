import * as React from 'react';
import { useDispatch } from 'react-redux';
import { sliceCart } from '../slices/sliceCart';
import { Title } from './title';
import {
  primaryEmail,
  primaryPhone,
} from '../../ts_helpers/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

export function ClientInfo({ client }: any) {
  const { name = 'Returning customer' } = client;
  const emailAddress = primaryEmail(client) ?
    primaryEmail(client) : 'Email not shown';
  const phoneNumber = primaryPhone(client) ?
    primaryPhone(client) : 'Phone number not shown';
  return (
    <div>
      <ul className='list-unstyled text-center'
          style={{
            fontSize: '15px',
            listStyle: 'none',
            marginBottom: '0px',
            paddingLeft: '0px'}}>
        <li>
          {name}
        </li>
        <li>
          {emailAddress}
        </li>
        <li>
          {phoneNumber}
        </li>
      </ul>
    </div>
  );
}

interface Props {
  client: any;
}

function CartClient(props: Props) {
  const { client } = props;
  const dispatch = useDispatch();
  function clearClient() {
    dispatch(sliceCart.actions.setCartClient(null))
  }
  return (
    <div className='p-b-20 p-t-0'>
      <Title
        icon={faUserCircle}
        title='Checkout as'
      />
      <ClientInfo client={client} />
      <Button
        color='default'
        size='md'
        onClick={clearClient}
        className='m-t-20'
      >
        <FontAwesomeIcon icon={faUserTimes} /> Change
      </Button>
    </div>
  );
}

export default CartClient;
