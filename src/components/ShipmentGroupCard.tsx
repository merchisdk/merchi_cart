import * as React from 'react';
import { useSelector } from 'react-redux';
import { setSelectedShipmentQuote } from '../store';
import { addressInOneLine } from '../utilities/address';
import { currencyTaxAndCost } from '../utilities/currency';
import { useCartContext } from '../CartProvider';
import pngProductNotFound from '../assets/product-not-found.png';

function NoCartShipmentOptionsFound() {
  const { classNameNoItems } = useCartContext();
  return (
    <div className={classNameNoItems}>
      <img src={pngProductNotFound.src} width={276} height={215} />
      <p>No cart items.</p>
    </div>
  );
}

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
      <small>
        <strong>
          {totalCost > 0 ? currencyTaxAndCost(currency, taxType, totalCost) : ''}
        </strong>
      </small>
    </div>
  );
}

interface PropsShipmentOptionInfo {
  quote: any;
}

function ShipmentOptionInfo({ quote }: PropsShipmentOptionInfo) {
  const { classNameShipmentOption } = useCartContext();
  const { name, shipmentMethod } = quote;
  const { originAddress, pickUp, transportCompanyName } = shipmentMethod;
  return (
    <div className={classNameShipmentOption}>
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

function ShipmentQuote({ groupIndex, quote }: ShipmentOptionProps) {
  const { classNameListItem } = useCartContext();
  const { selectedQuotes } = useSelector((s: any) => s.stateCartShipment);
  const isSelected = selectedQuotes[groupIndex].id === quote.id;
  function doClick() {
    setSelectedShipmentQuote(groupIndex, quote);
  }
  const icon = isSelected ? 'far fa-check-square' : 'far fa-square';
  return (
    <div
      className={classNameListItem}
      onClick={doClick}
      style={{cursor: 'pointer'}}
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
          <i className={icon} />
        </div>
      </div>
    </div>
  )
}

interface Props {
  group: any;
  groupIndex: number;
}

function ShipmentGroupCard({ group, groupIndex }: Props) {
  const {
    classNameList,
    classNameListInline,
  } = useCartContext();
  const { cartItems, quotes = [] } = group;
  return (
    <div>
      <ul className={classNameListInline}>
        <li>
          <strong>Shipment {groupIndex + 1} contents:</strong>
        </li>
        {cartItems.map((item: any, index: number) =>
          <li key={index}>
            {item.product.name}
          </li>
        )}
      </ul>
      {quotes.length ? (
        <div className={classNameList}>
          {quotes.map((q: any, i: number) =>
            <ShipmentQuote
              key={`${i}-group`}
              quote={q}
              groupIndex={groupIndex}
            />
          )}
        </div>
      ) : (
        <NoCartShipmentOptionsFound />
      )}
    </div>
  );
}

export default ShipmentGroupCard;
