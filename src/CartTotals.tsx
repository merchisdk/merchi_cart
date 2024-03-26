import { useSelector } from 'react-redux';
import { formatCurrency } from './utilities/currency';
import { cartRequiresShipment } from './utilities/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Table } from './components';
import { useCartContext } from './CartProvider';

interface Props {
  attribute: string;
}

function CartTotal({ attribute }: Props) {
  const {
    cart,
    fetchingCart,
    loading,
  } = useSelector((s: any) => s.stateCart);
  const {
    fetchingShipmentGroups,
    fetchingShipmentQuote,
  } = useSelector((s: any) => s.stateCartShipment);
  const { domain } = cart;
  const company = domain ? domain.company : null;
  const currency = company ? company.defaultCurrency : 'AUD';
  const isLoading =
    fetchingCart ||
    fetchingShipmentGroups ||
    fetchingShipmentQuote ||
    loading;
  const money = cart[attribute] ? cart[attribute] : 0;
  return (
    <div style={{paddingRight: 8}}>
      {isLoading ?
        <FontAwesomeIcon
          icon={faCircleNotch}
          spin={true}
        />
      :
        `${currency} ${formatCurrency(money, { currency })}`
      }
    </div>
  );
}

interface RowProps {
  attr: string;
  name: string;
}

function CostsTableRow({ attr, name }: RowProps) {
  const {
    classNameCartTotalItem,
    classNameCartTotalItemPrice,
  } = useCartContext();
  return (
    <tr>
      <td className={classNameCartTotalItem}>
        {name}
      </td>
      <th className={classNameCartTotalItemPrice}>
        <CartTotal attribute={attr} />
      </th>
    </tr>
  );
}

function CartTotals() {
  const {
    classNameCartTotalContainer,
    classNameCartTotalItemPrice
  } = useCartContext();
  const { cart } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems ? cart.cartItems : [];
  return (
    <div className={classNameCartTotalContainer}>
      <Table className='merchi-cart-total-table'>
        <tbody>
          <CostsTableRow
            attr='cartItemsTotalCost'
            name='Subtotal'
          />
          {
            cartRequiresShipment({ ...cart, cartItems }) &&
              <CostsTableRow
                attr='shipmentTotalCost'
                name='Shipping'
              />
          }
          <CostsTableRow
            attr='totalCost'
            name='Total'
          />
          <tr>
            <td />
            <td className={classNameCartTotalItemPrice}>
              Total price includes taxes
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CartTotals;
