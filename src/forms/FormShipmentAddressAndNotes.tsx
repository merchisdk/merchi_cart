import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputsAddress from './InputsAddress';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import { Title } from '../components';
import {
  updateCartShipmentAddress,
  saveCartShipmentAddressAndGoToNextTab,
} from '../store';
import { shipmentFormId, sliceCartShipment } from '../slices/sliceCartShipment';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../CartProvider';

interface PropsAddress {
  defaultAddress?: any;
  labelGeoSuggest?: string;
  hookForm: any;
  name?: string;
  placeholder?: string;
  updateAddress: (address: any) => void;
}

const AddressGeoSuggestInput = (props: PropsAddress) => (
  <InputsAddress {...props} name='receiverAddress' />
);

interface Props {
  address?: any;
  addressFieldsOpen: boolean;
  formId: string;
  notes?: string;
  showIcon?: boolean;
  deliveryNomenclature?: boolean;
  showHeadings?: boolean;
  setCartShipmentAddress: (values: any) => void;
  toggleAddressFields: () => void;
  updateCartShipmentAddress: (address: any) => void;
}

function FormShipmentAddressAndNotes({
    address = {},
    formId,
    notes = '',
    showIcon = true,
    deliveryNomenclature = false,
    showHeadings = true,
    setCartShipmentAddress,
    updateCartShipmentAddress,
  }: Props) {
  const { classNameCartFormGroup } = useCartContext();
  const hookForm = useForm({
    defaultValues: {
      receiverAddress: address,
      receiverNotes: notes,
    },
  });
  const {
    getValues,
    handleSubmit,
    register,
    reset,
  } = hookForm;

  function onSubmit() {
    setCartShipmentAddress(getValues());
  }
  function updateAddress(addr: any) {
    const oldAddresses: any = getValues();
    const newAddress = addr ? {...addr} : {};
    oldAddresses['receiverAddress'] = newAddress;
    reset(oldAddresses);
    updateCartShipmentAddress(newAddress)
  }
  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
    >
      {showHeadings && 
        <CheckoutContainer>
          <InnerContainer paddingBottom='1rem'>
            <Title
              icon={showIcon ? faMapMarkerAlt : null}
              Title='Delivery / billing address'
            />
          </InnerContainer>
        </CheckoutContainer>
      }
      <AddressGeoSuggestInput
        defaultAddress={address}
        hookForm={hookForm}
        labelGeoSuggest={`Enter your ${deliveryNomenclature ? 'delivery' : 'shipping'} address`}
        name='receiverAddress'
        updateAddress={updateAddress}
      />
      <div className={classNameCartFormGroup}>
        <label>{deliveryNomenclature ? 'Delivery' : 'Shipment'} notes</label>
        <textarea
          className='form-control input'
          defaultValue={notes}
          name='receiverNotes'
          placeholder='Example - Leave at top of stairs'
          rows={4}
          ref={register}
        >
        </textarea>
      </div>
    </form>
  );
}

export function ActiveFormShipmentAddressAndNotes() {
  const dispatch = useDispatch();
  const {
    addressFieldsOpen,
    receiverAddress,
    receiverNotes,
  } = useSelector((s: any) => s.stateCartShipment);
  function toggleAddressFieldsOpen() {
    dispatch(sliceCartShipment.actions.toggleAddressFields());
  }
  function actionUpdateCartShipmentAddress(address: any) {
    dispatch(sliceCartShipment.actions.
      updateShipmentAddress(address));
    updateCartShipmentAddress();
  }
  return (
    <FormShipmentAddressAndNotes
      address={receiverAddress}
      addressFieldsOpen={addressFieldsOpen}
      formId={shipmentFormId}
      notes={receiverNotes}
      setCartShipmentAddress={saveCartShipmentAddressAndGoToNextTab}
      toggleAddressFields={toggleAddressFieldsOpen}
      updateCartShipmentAddress={actionUpdateCartShipmentAddress}
    />
  );
}

export default FormShipmentAddressAndNotes;
