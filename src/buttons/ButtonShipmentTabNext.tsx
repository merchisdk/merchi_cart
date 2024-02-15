import * as React from 'react';
import { useSelector } from 'react-redux';
import { shipmentFormId } from '../slices/sliceCartShipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';

export default function ButtonShipmentTabNext() {
  const { classNameBtnNext } = useCartContext();
  const { savingShipmentAddress } = useSelector((s: any) => s.stateCartShipment);
  const icon = savingShipmentAddress ? faCircleNotch : faArrowRight;
  return (
    <Button
      className={classNameBtnNext}
      form={shipmentFormId}
      disabled={savingShipmentAddress}
      type='submit'
    >
      <FontAwesomeIcon icon={icon} spin={savingShipmentAddress} />
      <span style={{marginLeft: '5px'}}>
        {savingShipmentAddress ? 'Loading...' : 'Next'}
      </span>
    </Button>
  );
}
