import * as React from 'react';
import { useSelector } from 'react-redux';
import { LoadingTemplateSm } from '../../list-utility';
import { ActiveFormShipmentAddressAndNotes } from '../forms/FormShipmentAddressAndNotes';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import { Title }  from '../components/title';
import ShipmentGroupCard from '../components/ShipmentGroupCard';
import { tabIdShipment } from '../slices/sliceCart';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import CartNav from '../tabs/CartNav';
import { Alert, ModalBody, TabPane } from 'reactstrap';

interface Props {}

function PanelCartShipment(props: Props) {
  const {
    cartShipmentState: {
      fetchingShipmentGroups,
      shipmentGroups,
    },
  } = useSelector((s: any) => s);
  return (
    <TabPane
      className='p-0'
      tabId={tabIdShipment}
    >
      <CartNav />
      <ModalBody
        style={{
          paddingTop: '2rem',
        }}
      >
        <div className='merchi-tab-content'>
          <CheckoutContainer
            textAlign='left'
          >
            <InnerContainer
              width={700}
              paddingBottom='3rem'
            >
              <ActiveFormShipmentAddressAndNotes />
            </InnerContainer>
          </CheckoutContainer>
          {fetchingShipmentGroups ?
            <CheckoutContainer>
              <InnerContainer
                width={700}
              >
                <LoadingTemplateSm />
                <p>Fetching shipping options.</p>
              </InnerContainer>
            </CheckoutContainer> :
            <>
              <CheckoutContainer
                textAlign='left'
              >
                <InnerContainer
                  paddingBottom='1rem'
                  width={700}
                >
                  <Title
                    icon={faTruck}
                    title={
                      shipmentGroups.length > 1 ?
                        'Select shipment methods'
                      : shipmentGroups.length ?
                        'Select a shipment method'
                      : ''
                    }
                  />
                </InnerContainer>
              </CheckoutContainer>
              <CheckoutContainer
                textAlign='left'
              >
                <InnerContainer
                  paddingBottom='1rem'
                  width={700}
                >
                  {shipmentGroups.length > 1 &&
                    <Alert color='warning'>
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
                    />)
                  }
                </InnerContainer>
              </CheckoutContainer>
            </>
          }
        </div>
      </ModalBody>
    </TabPane>
  );
}

export default PanelCartShipment;
