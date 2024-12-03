import * as React from 'react';
import { shipmentFormId } from '../utilities/shipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useCartContext } from '../CartProvider';

export default function ButtonShipmentTabNext() {
  const { classNameBtnNext, loadingTotals } = useCartContext();
  const icon = loadingTotals ? faCircleNotch : faArrowRight;
  return (
    <Button
      className={classNameBtnNext}
      form={shipmentFormId}
      disabled={loadingTotals}
      type='submit'
    >
      <FontAwesomeIcon icon={icon} spin={loadingTotals} />
      <span style={{marginLeft: '5px'}}>
        {loadingTotals ? 'Loading...' : 'Next'}
      </span>
    </Button>
  );
}
