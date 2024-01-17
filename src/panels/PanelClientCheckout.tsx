import * as React from 'react';
import { useSelector } from 'react-redux';
import { tabIdCheckout } from '../slices/sliceCart';
import CartNav from '../tabs/CartNav';
import {
  CheckoutContainer,
  InnerContainer,
} from '../components/containers';
import CartClient from '../components/CartClient';
import CartShipment from '../components/CartShipment';
import {
  CartBody,
  CartTabPanel,
  Title,
} from '../components';
import FormNewCustomer from '../forms/FormNewCustomer';
import FormReturningCustomer from '../forms/FormReturningCustomer';
import FormSquarePayment from '../forms/FormSquarePayment';
import FormStripePayment from '../forms/FormStripePayment';
import { faUserPlus, faUserTag } from '@fortawesome/free-solid-svg-icons';

function PanelClientCheckout() {
  const { cart, needsShipping } = useSelector((s: any) => s.stateCart);
  const { client, domain } = cart;
  const company = domain && domain.company;
  return (
    <CartTabPanel tabId={tabIdCheckout}>
      <CartNav />
      <CartBody style={{ paddingTop: '2rem' }}>
        {client && client.id > -1 ?
          <>
            <CheckoutContainer>
              <InnerContainer
                paddingBottom='3rem'
              >
                <CartClient client={client} />
              </InnerContainer>
            </CheckoutContainer>
            {needsShipping &&
              <CheckoutContainer>
                <InnerContainer
                  paddingBottom='3rem'
                >
                  <CartShipment cart={cart} />
                </InnerContainer>
              </CheckoutContainer>
            }
            {Boolean(company) && company.acceptSquare &&
              <CheckoutContainer>
                <InnerContainer
                  paddingBottom='3rem'
                >
                  <FormSquarePayment />
                </InnerContainer>
              </CheckoutContainer>
            }
            <CheckoutContainer>
              <InnerContainer>
                <FormStripePayment />
              </InnerContainer>
            </CheckoutContainer>

          </>
        :
          <>
            <CheckoutContainer>
              <InnerContainer
                paddingBottom='3rem'
              >
                <Title
                  icon={faUserPlus}
                  Title='Checkout as new customer'
                />
                <FormNewCustomer />
              </InnerContainer>
            </CheckoutContainer>
            <CheckoutContainer>
              <InnerContainer
                paddingBottom='3rem'
              >
                <Title
                  icon={faUserTag}
                  Title='Checkout as returning customer'
                />
                <FormReturningCustomer />
              </InnerContainer>
            </CheckoutContainer>
          </>
        }
      </CartBody>
    </CartTabPanel>
  );
}

export default PanelClientCheckout;
