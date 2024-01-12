import * as React from 'react';
import { useSelector } from 'react-redux';
import { setSelectedShipmentQuote } from '../store';
import Icon from '../../components/icons/Icon';
import { addressInOneLine } from '../../ts_helpers/address';
import { currencyTaxAndCost } from '../../ts_helpers/currency';
import { NoCartShipmentOptionsFound } from '../../list-utility';
import { ListGroup, ListGroupItem } from 'reactstrap';

interface PropsPickupInfo {
  originAddress: any;
}

function PickupInfo({ originAddress }: PropsPickupInfo) {
  return (
    <small>
      Pick up from: {addressInOneLine(originAddress)}
    </small>
  );
}

function ShipmentPrice({ quote }: any) {
  const { shipmentMethod, taxType, totalCost } = quote;
  const { currency } = shipmentMethod;
  return (
    <div>
      <small className='font-weight-bold'>
        {totalCost > 0 ? currencyTaxAndCost(currency, taxType, totalCost) : ''}
      </small>
    </div>
  );
}

interface PropsShipmentOptionInfo {
  quote: any;
}

function ShipmentOptionInfo({ quote }: PropsShipmentOptionInfo) {
  const { name, shipmentMethod } = quote;
  const { originAddress, pickUp, transportCompanyName } = shipmentMethod;
  return (
    <div className='shipment-option-info'>
      {
        !name ?
          <>
            {transportCompanyName &&
              <p className='mb-0'>
                {shipmentMethod.name}
              </p>
            } 
            {
              pickUp ?
                <PickupInfo originAddress={originAddress} />
             :
                <small>{transportCompanyName}</small>
            }
          </>
        :
          <>
            <p className='m-0'>{name}</p>
            {pickUp && <PickupInfo originAddress={originAddress} />}
          </>
      }
      <ShipmentPrice quote={quote} />
    </div>
  );
}

interface ShipmentOptionProps {
  groupIndex: number;
  quote: any;
}

function ShipmentQuote(props: ShipmentOptionProps) {
  const state = useSelector((s: any) => s.cartShipmentState);
  const { selectedQuotes } = state;
  const { groupIndex, quote } = props;
  const isSelected = selectedQuotes[groupIndex].id === quote.id;
  function doClick() {
    setSelectedShipmentQuote(groupIndex, quote);
  }
  const icon = isSelected ? 'far fa-check-square' : 'far fa-square';
  return (
    <ListGroupItem
      className='cursor-pointer'
      onClick={doClick}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ShipmentOptionInfo quote={quote} />
        <div>
          <Icon icon={icon} />
        </div>
      </div>
    </ListGroupItem>
  )
}

interface Props {
  group: any;
  groupIndex: number;
}

function ShipmentGroupCard(props: Props) {
  const { group, groupIndex } = props;
  const { cartItems, quotes = [] } = group;
  return (
    <div>
      <ul className='list-inline'>
        <li>
          <strong>Shipment {groupIndex + 1} contents:</strong>
        </li>
        {cartItems.map((item: any, index: number) =>
          <li key={index}>
            {item.product.name}
          </li>)}
      </ul>
      {quotes.length ?
        <ListGroup>
          {quotes.map((q: any, i: number) =>
            <ShipmentQuote
              key={`${i}-group`}
              quote={q}
              groupIndex={groupIndex}
            />)
          }
        </ListGroup>
      :
        <NoCartShipmentOptionsFound />
      }
    </div>
  );
}

export default ShipmentGroupCard;
