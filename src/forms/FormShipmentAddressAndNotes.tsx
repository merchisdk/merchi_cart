import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import AddressGeoSuggestInput from '../../address_components/forms/AddressGeoSuggestInput';
import {
  updateCartShipmentAddress,
  saveCartShipmentAddressAndGoToNextTab,
} from '../store';
import { Title }  from '../components/title';
import { useForm } from 'react-hook-form';
import { shipmentFormId, sliceCartShipment } from '../slices/slice_cart_shipment';
import { FormGroup, Label } from 'reactstrap';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
    addressFieldsOpen,
    address = {},
    formId,
    notes = '',
    showIcon = true,
    deliveryNomenclature = false,
    showHeadings = true,
    setCartShipmentAddress,
    toggleAddressFields,
    updateCartShipmentAddress,
  }: Props) {
  const {
    errors,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      receiverAddress: address,
      receiverNotes: notes,
    },
  });

  function getErrors(key: string) {
    return errors && (errors as any)[key] ? (errors as any)[key] : {};
  }
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
              title='Delivery / billing address'
            />
          </InnerContainer>
        </CheckoutContainer>
      }
      <AddressGeoSuggestInput
        address={address}
        addressFieldsOpen={addressFieldsOpen}
        errors={getErrors('receiverAddress')}
        geoSuggestInputLabel={`Enter your ${deliveryNomenclature ? 'delivery' : 'shipping'} address`}
        getValues={getValues}
        name='receiverAddress'
        register={register}
        setValue={setValue}
        toggleAddressFieldsOpen={toggleAddressFields}
        updateAddress={updateAddress}
      />
      <FormGroup>
        <Label>{deliveryNomenclature ? 'Delivery' : 'Shipment'} notes</Label>
        <textarea
          className='form-control input'
          defaultValue={notes}
          name='receiverNotes'
          placeholder='Example - Leave at top of stairs'
          rows={4}
          ref={register}
        >
        </textarea>
      </FormGroup>
    </form>
  );
}

export function ActiveFormShipmentAddressAndNotes() {
  const dispatch = useDispatch();
  const {
    addressFieldsOpen,
    receiverAddress,
    receiverNotes,
  } = useSelector((s: any) => s.cartShipmentState);
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
