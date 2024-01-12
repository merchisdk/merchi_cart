import * as React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../currency';
import { cartRequiresShipment } from '../ts_helpers/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Table } from 'reactstrap';

interface Props {
  attribute: string;
}

function CartTotal(props: Props) {
  const { attribute } = props;
  const {
    stateCart: {
      cart,
      fetchingCart,
      loading,
    },
    cartShipmentState: {
      fetchingShipmentGroups,
      fetchingShipmentQuote,
    },
  } = useSelector((s: any) => s);
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

function CostsTableRow(props: RowProps) {
  const { attr, name } = props;
  return (
    <tr>
      <td className='text-right cart-cell-width-subtotal'>
        {name}
      </td>
      <th className='text-right'>
        <CartTotal attribute={attr} />
      </th>
    </tr>
  );
}

function CartTotals() {
  const { cart } = useSelector((s: any) => s.stateCart);
  const cartItems = cart.cartItems ? cart.cartItems : [];
  return (
    <Row>
      <Col>
        <Table borderless className='m-b-0'>
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
              <td className='text-right text-muted cart-tax-row'>
                Total price includes taxes
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default CartTotals;
