import { tabIdCheckout } from '../utilities/tabs';
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
import { faCoins, faCreditCard, faUserPlus, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../CartProvider';
import DiscountInputGroup from '../components/DiscountInputGroup';
import CartTotalsListGroup from '../components/CartTotalsListGroup';
import { cartItemsNeedShipment } from '../slices/sliceCart';

function PanelClientCheckout() {
  const { cart, showDiscountCode } = useCartContext();
  const needsShipping = cartItemsNeedShipment(cart);
  const { client, domain } = cart;
  const company = domain && domain.company;
  return (
    <CartTabPanel tabId={tabIdCheckout}>
      <CartBody style={{ paddingTop: '2rem' }}>
        {client && client.id > -1 ?
          <>
            <CheckoutContainer>
              <InnerContainer paddingBottom='3rem'>
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
            {showDiscountCode && (
              <CheckoutContainer>
                <InnerContainer
                  paddingBottom='3rem'
                >
                  <DiscountInputGroup />
                </InnerContainer>
              </CheckoutContainer>
            )}
            {Boolean(company) && company.acceptSquare &&
              <CheckoutContainer>
                <InnerContainer
                  paddingTop='3rem'
                  paddingBottom='3rem'
                >
                  <FormSquarePayment />
                </InnerContainer>
              </CheckoutContainer>
            }
            <CheckoutContainer>
              <InnerContainer
                paddingBottom='3rem'
              >
                <Title
                  icon={faCoins}
                  title='Cart total'
                />
                <CartTotalsListGroup />
              </InnerContainer>
            </CheckoutContainer>
            <CheckoutContainer>
              <InnerContainer
                paddingBottom='3rem'
              >
               <Title
                  icon={faCreditCard}
                  title='Credit card payment'
                />
                <FormStripePayment />
              </InnerContainer>
            </CheckoutContainer>

          </>
        :
          <>
            <CheckoutContainer>
              <InnerContainer paddingBottom='0px'>
                <Title
                  icon={faUserPlus}
                  title='Checkout as new customer'
                />
                <FormNewCustomer />
              </InnerContainer>
            </CheckoutContainer>
            <CheckoutContainer>
              <InnerContainer paddingBottom='0px'>
                <Title
                  icon={faUserTag}
                  title='Checkout as returning customer'
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
