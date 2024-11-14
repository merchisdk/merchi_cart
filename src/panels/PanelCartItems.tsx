import CartItemRow from '../components/CartItemRow'
import { tabIdItems } from '../utilities/tabs';
import {
  CartTableContainer,
  CartTabPanel,
  NoCartItems,
  Table,
} from '../components';
import { useCartContext } from '../CartProvider';

function PanelCartItems() {
  const { cart } = useCartContext();
  const cartItems = cart.cartItems ? cart.cartItems : [];
  const hasItems = cartItems.length > 0;
  return (
    <CartTabPanel tabId={tabIdItems}>
      <div>
        {hasItems ? (
          <CartTableContainer>
            <Table>
              <thead>
                <tr>
                  <th scope='col' className='merchi-cart-item-table-head'>
                    Product
                  </th>
                  <th scope='col' className='merchi-cart-item-table-head-right'>
                    Quantity
                  </th>
                  <th scope='col' className='merchi-cart-item-table-head-right'>
                    Price
                  </th>
                  <th scope='col' className='merchi-cart-item-table-head-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem: any, index: number) =>
                  <CartItemRow
                    key={cartItem.id}
                    cartItem={cartItem}
                    index={index}
                  />)
                }
              </tbody>
            </Table>
          </CartTableContainer>
        ) : (
          <NoCartItems />
        )}
      </div>
    </CartTabPanel>
  );
}

export default PanelCartItems;
