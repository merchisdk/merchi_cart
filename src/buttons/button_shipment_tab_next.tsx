import * as React from 'react';
import { useSelector } from 'react-redux';
import { shipmentFormId } from '../slices/slice_cart_shipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

interface Props {
}

function ButtonShipmentTabNext(props: Props) {
  const { savingShipmentAddress } = useSelector((s: any) => s.cartShipmentState);
  const icon = savingShipmentAddress ? faCircleNotch : faArrowRight;
  return (
    <Button
      color='primary'
      form={shipmentFormId}
      size='lg'
      disabled={savingShipmentAddress}
    >
      <FontAwesomeIcon icon={icon} spin={savingShipmentAddress} />
      <span style={{marginLeft: '5px'}}>
        {savingShipmentAddress ? 'Loading...' : 'Next'}
      </span>
    </Button>
  );
}

export default ButtonShipmentTabNext;
