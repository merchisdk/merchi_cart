import { useForm } from "react-hook-form";
import InputsAddress from "./InputsAddress";
import { CheckoutContainer, InnerContainer } from "../components/containers";
import { Title } from "../components";
import { shipmentFormId } from "../utilities/shipment";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../CartProvider";
import { useState } from "react";
import { getCartCookieToken } from "../utilities/cookie";
import { makeAddress } from "../utilities/address";
import { makeCart } from "../utilities/cart";
import { cartEmbed } from "../utilities/helpers";
import { tabIdCheckout } from "../utilities/tabs";

interface PropsAddress {
  defaultAddress?: any;
  labelGeoSuggest?: string;
  hookForm: any;
  name?: string;
  placeholder?: string;
  updateAddress: (address: any) => void;
}

const AddressGeoSuggestInput = (props: PropsAddress) => (
  <InputsAddress {...props} name="receiverAddress" />
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
}

function FormShipmentAddressAndNotes({
  address = {},
  formId,
  notes = "",
  showIcon = true,
  deliveryNomenclature = false,
  showHeadings = true,
  setCartShipmentAddress,
}: Props) {
  const { classNameCartFormGroup, updateCartShipmentAddress } =
    useCartContext();
  const hookForm = useForm({
    defaultValues: {
      receiverAddress: address,
      receiverNotes: notes,
    },
  });
  const { getValues, handleSubmit, register, reset } = hookForm;

  function onSubmit() {
    setCartShipmentAddress(getValues());
  }
  function updateAddress(addr: any) {
    const oldAddresses: any = getValues();
    const newAddress = addr ? { ...addr } : {};
    oldAddresses["receiverAddress"] = newAddress;
    reset(oldAddresses);
    updateCartShipmentAddress(newAddress);
  }
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      {showHeadings && (
        <CheckoutContainer>
          <InnerContainer paddingBottom="0px">
            <Title
              icon={showIcon ? faMapMarkerAlt : null}
              title="Delivery / billing address"
            />
          </InnerContainer>
        </CheckoutContainer>
      )}
      <AddressGeoSuggestInput
        defaultAddress={address}
        hookForm={hookForm}
        labelGeoSuggest={`Enter your ${
          deliveryNomenclature ? "delivery" : "shipping"
        } address`}
        name="receiverAddress"
        updateAddress={updateAddress}
      />
      <div className={classNameCartFormGroup}>
        <label>{deliveryNomenclature ? "Delivery" : "Shipment"} notes</label>
        <textarea
          className="form-control input"
          defaultValue={notes}
          placeholder="Example - Leave at top of stairs"
          rows={4}
          {...register("receiverNotes")}
        ></textarea>
      </div>
    </form>
  );
}

export function ActiveFormShipmentAddressAndNotes() {
  const {
    alertError,
    domainId,
    cart,
    setCart,
    setLoadingTotals,
    setActiveTabAndEditDisabled,
  } = useCartContext();
  const { receiverAddress = {}, receiverNotes } = cart;
  const [addressFieldsOpen, setAddressFieldsOpen] = useState(false);

  async function saveCartShipmentAddressAndGoToNextTab(values: any) {
    const { receiverAddress: address, receiverNotes } = values;
    const cartToken = await getCartCookieToken(domainId as number);
    setLoadingTotals(true);
    const receiverAddress = makeAddress(address, true);
    const cartEnt = makeCart(cart, false, cartToken);
    cartEnt.receiverAddress = receiverAddress;
    cartEnt.receiverNotes = receiverNotes;
    try {
      await cartEnt.save({ embed: cartEmbed });
      setCart(c.toJson()); // Update cart context
      setActiveTabAndEditDisabled({
        tabId: tabIdCheckout,
        tabIndexToSet: 2,
        disabled: false,
      });
    } catch (e: any) {
      alertError(
        e.errorMessage || e.message || "Unable to set shipment address."
      );
    } finally {
      setLoadingTotals(false);
    }
  }
  return (
    <FormShipmentAddressAndNotes
      address={receiverAddress}
      addressFieldsOpen={addressFieldsOpen}
      formId={shipmentFormId}
      notes={receiverNotes}
      setCartShipmentAddress={saveCartShipmentAddressAndGoToNextTab}
      toggleAddressFields={() => setAddressFieldsOpen(!addressFieldsOpen)}
    />
  );
}

export default FormShipmentAddressAndNotes;
