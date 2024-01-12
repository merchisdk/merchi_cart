import * as React from 'react';
import { useSelector } from 'react-redux';
import CartItemRow from '../components/CartItemRow'
import { tabIdItems } from '../slices/sliceCart';
import CartNav from '../tabs/CartNav';
import { NoCartItems } from '../../list-utility';
import { ModalBody, TabPane, Table } from 'reactstrap';

interface Props {
}

function PanelCartItems(props: Props) {
  const { cart, deletingCartItemIndex } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems ? cart.cartItems : [];
  const hasItems = cartItems.length > 0;
  return (
    <TabPane
      className='p-0'
      tabId={tabIdItems}
    >
      <ModalBody className='p-0'>
        <CartNav />
        <div className='merchi-tab-content'>
          {hasItems ?
            <div className='table-responsive'>
              <Table className='m-b-0'>
                <thead>
                  <tr>
                    <th scope='col' className='border-0 bg-light'>
                      <div className='p-2 px-3 text-uppercase'>Product</div>
                    </th>
                    <th scope='col' className='border-0 bg-light'>
                      <div className='py-2 text-uppercase'>Quantity</div>
                    </th>
                    <th scope='col' className='border-0 bg-light text-right'>
                      <div className='py-2 text-uppercase'>Price</div>
                    </th>
                    <th scope='col' className='border-0 text-right'>
                      <div className='py-2 text-uppercase'>Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((cartItem: any, index: number) =>
                    <CartItemRow
                      key={cartItem.id}
                      cartItem={cartItem}
                      index={index}
                      loading={deletingCartItemIndex === index}
                    />)
                  }
                </tbody>
              </Table>
            </div> :
            <NoCartItems />}
        </div>
      </ModalBody>
    </TabPane>
  );
}

export default PanelCartItems;
