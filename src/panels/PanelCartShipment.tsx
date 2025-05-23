import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ActiveFormShipmentAddressAndNotes } from '../forms/FormShipmentAddressAndNotes';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import {
  Alert,
  CartBody,
  CartTabPanel,
  LoadingTemplateSm,
  ShipmentGroupCard,
  Title,
} from '../components';
import { tabIdShipment } from '../utilities/tabs';
import { useCartContext } from '../CartProvider';

function PanelCartShipment() {
  const {
    cart,
    fetchingShipmentGroups,
  } = useCartContext();
  const { shipmentGroups = [] } = cart;
  return (
    <CartTabPanel tabId={tabIdShipment}>
      <CartBody style={{ paddingTop: '2rem' }}>
        <div className='merchi-cart-tab-content'>
          <CheckoutContainer textAlign='left'>
            <InnerContainer width={700} paddingBottom='3rem'>
              <ActiveFormShipmentAddressAndNotes />
            </InnerContainer>
          </CheckoutContainer>
          <CheckoutContainer textAlign='center'>
            <InnerContainer
              paddingBottom='0px'
              width={700}
            >
              <Title
                icon={faTruck}
                title={
                  shipmentGroups.length > 1
                  ? 'Select shipment methods'
                  : shipmentGroups.length
                  ? 'Select a shipment method'
                  : ''
                }
              />
            </InnerContainer>
          </CheckoutContainer>
          {fetchingShipmentGroups ? (
            <CheckoutContainer>
              <InnerContainer width={700}>
                <LoadingTemplateSm />
                <p>Fetching shipping options.</p>
              </InnerContainer>
            </CheckoutContainer>
          ) : (
            <CheckoutContainer textAlign='left'>
              <InnerContainer
                paddingBottom='1rem'
                width={700}
              >
                {shipmentGroups.length > 1 &&
                  <Alert alertType='warning'>
                    Items within this cart are warehoused in different locations
                    and will be shipped separately. Please select how you would
                    like your items to be shipped.
                  </Alert>
                }
                {shipmentGroups.map((group: any, index: number) =>
                  <ShipmentGroupCard
                    group={group}
                    groupIndex={index}
                    key={`${index}-shipment-group`}
                  />
                )}
              </InnerContainer>
            </CheckoutContainer>
          )}
        </div>
      </CartBody>
    </CartTabPanel>
  );
}

export default PanelCartShipment;
